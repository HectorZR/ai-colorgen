/**
 * Palette Generator Module - Main Export Index
 *
 * This file serves as the main entry point for the palette generator module,
 * providing a clean interface for importing components and utilities from
 * other parts of the application. It follows the barrel pattern for exports.
 */

// Main Components
export { default as PaletteGenerator } from './components/PaletteGenerator';
export { default as PaletteForm } from './components/PaletteForm';
export { default as PaletteResults } from './components/PaletteResults';
export { default as ColorCard } from './components/ColorCard';
export { default as LoadingSpinner } from './components/LoadingSpinner';

// Services
export {
  generatePalette,
  generatePaletteWithAI,
  exportPalette
} from './services/palette-api';

// Types
export type {
  PaletteGenerationRequest,
  GeneratedPalette,
  Color,
  PaletteGenerationResponse,
  LoadingState,
  ExportFormat,
  FormErrors,
  CopyResult
} from './types';

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
  formatDate
} from './utils';

// Default export for the main component
export { default } from './components/PaletteGenerator';
