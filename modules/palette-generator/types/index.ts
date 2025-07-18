/**
 * Types for the Palette Generator module
 *
 * This file defines all the TypeScript interfaces and types used across
 * the palette generator functionality, maintaining type safety and consistency.
 */

// Form data structure for the palette generation request
export interface PaletteGenerationRequest {
  description: string;
}

// Individual color information in the generated palette
export interface Color {
  id: string;
  name: string;
  hex: string;
  purpose: string;
  recommendedUsage: string[];
  variations?: {
    hover?: string;
    active?: string;
    disabled?: string;
  };
}

// Complete palette response structure
export interface GeneratedPalette {
  id: string;
  name: string;
  description: string;
  colors: Color[];
  harmonyRule: string;
  environment: string;
  createdAt: string;
}

// API response structure for palette generation
export interface PaletteGenerationResponse {
  success: boolean;
  data?: GeneratedPalette;
  error?: string;
}

// Loading states for the application
export type LoadingState = 'idle' | 'generating' | 'success' | 'error';

// Export format options
export type ExportFormat = 'css-variables' | 'json' | 'scss' | 'tailwind';

// Form validation errors
export interface FormErrors {
  description?: string[];
}

// Copy to clipboard result
export interface CopyResult {
  success: boolean;
  message: string;
}
