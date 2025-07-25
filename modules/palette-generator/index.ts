/**
 * Palette Generator Module - Main Export Index
 *
 * This file serves as the main entry point for the palette generator module,
 * providing a clean interface for importing components and utilities from
 * other parts of the application. It follows the barrel pattern for exports.
 */

// Main Components
export { default as PaletteGenerator } from "./components/palette-generator";
export { default as PaletteForm } from "./components/palette-form";
export { default as PaletteResults } from "./components/palette-results";
export { default as ColorCard } from "./components/color-card";
export { default as LoadingSpinner } from "./components/loading-spinner";

// Services
export {
  generatePalette,
  generatePaletteWithAI,
  exportPalette,
} from "./services/palette-api";

// Types
export type {
  PaletteGenerationRequest,
  GeneratedPalette,
  Color,
  PaletteGenerationResponse,
  LoadingState,
  ExportFormat,
  FormErrors,
  CopyResult,
} from "./types";

// Utilities
export {
  isValidHexColor,
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  isLightColor,
  getTextColor,
  copyToClipboard,
  downloadPalette,
  validateDescription,
  formatColorName,
  generateColorId,
  debounce,
  generateUniqueId,
  getEnvironmentCapabilities,
  sanitizeInput,
  calculateReadingTime,
  formatDate,
} from "./utils";

// Default export for the main component
export { default } from "./components/palette-generator";
