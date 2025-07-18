/**
 * Utility functions for the Palette Generator module
 *
 * This file contains helper functions for color manipulation, validation,
 * clipboard operations, and other common tasks used across the palette generator.
 */

import { Color, GeneratedPalette, CopyResult, ExportFormat } from "../types";

/**
 * Validates if a string is a valid hex color
 */
export const isValidHexColor = (hex: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(hex);
};

/**
 * Converts hex color to RGB values
 */
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  if (!isValidHexColor(hex)) return null;

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Converts RGB values to hex color
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Calculates the luminance of a color for accessibility checks
 */
export const getLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculates contrast ratio between two colors
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Determines if a color is light or dark
 */
export const isLightColor = (hex: string): boolean => {
  return getLuminance(hex) > 0.5;
};

/**
 * Gets the appropriate text color (black or white) for a given background color
 */
export const getTextColor = (backgroundColor: string): string => {
  return isLightColor(backgroundColor) ? "#000000" : "#ffffff";
};

/**
 * Copies text to clipboard with fallback for older browsers
 */
export const copyToClipboard = async (text: string): Promise<CopyResult> => {
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true, message: "Copied to clipboard!" };
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      return { success: true, message: "Copied to clipboard!" };
    } else {
      throw new Error("Copy command failed");
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return { success: false, message: "Failed to copy to clipboard" };
  }
};

/**
 * Generates a downloadable file from palette data
 */
export const downloadPalette = (
  palette: GeneratedPalette,
  format: ExportFormat,
): void => {
  const { exportPalette } = require("../services/palette-api");
  const content = exportPalette(palette, format);

  const mimeTypes = {
    "css-variables": "text/css",
    json: "application/json",
    scss: "text/plain",
    tailwind: "text/javascript",
  };

  const extensions = {
    "css-variables": "css",
    json: "json",
    scss: "scss",
    tailwind: "js",
  };

  const blob = new Blob([content], { type: mimeTypes[format] });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${palette.name.toLowerCase().replace(/\s+/g, "-")}.${extensions[format]}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Validates the palette generation form description
 */
export const validateDescription = (description: string): string[] => {
  const errors: string[] = [];

  if (!description || description.trim().length === 0) {
    errors.push("Description is required");
  }

  if (description.trim().length < 10) {
    errors.push("Description must be at least 10 characters long");
  }

  if (description.trim().length > 1000) {
    errors.push("Description must be less than 1000 characters");
  }

  return errors;
};

/**
 * Formats a color name for display
 */
export const formatColorName = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Generates a color ID based on name and index
 */
export const generateColorId = (name: string, index: number): string => {
  const cleanName = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `color-${cleanName}-${index}`;
};

/**
 * Debounce function for form inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Generates a unique ID for tracking purposes
 */
export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Checks if the current environment supports modern features
 */
export const getEnvironmentCapabilities = () => {
  return {
    hasClipboardAPI: !!(navigator.clipboard && window.isSecureContext),
    hasDownloadSupport: !!(document.createElement("a").download !== undefined),
    hasModernBrowser: !!(Boolean(window.fetch) && window.Promise && window.Map),
  };
};

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Calculates the reading time for a description
 */
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Formats a date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
