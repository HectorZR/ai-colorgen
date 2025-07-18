/**
 * Service layer for Palette Generator API interactions
 *
 * This service handles all API communications for palette generation,
 * including mock data responses and future integration with real AI services.
 */

import {
  PaletteGenerationRequest,
  PaletteGenerationResponse,
  GeneratedPalette,
  Color
} from '../types';

/**
 * Mock data for development and testing
 */
const mockPaletteData: GeneratedPalette[] = [
  {
    id: 'palette-1',
    name: 'Modern Web Blues',
    description: 'A cool, professional palette perfect for web applications',
    colors: [
      {
        id: 'color-1',
        name: 'Deep Ocean',
        hex: '#1e3a8a',
        purpose: 'Primary Brand Color',
        recommendedUsage: ['Headers', 'Primary buttons', 'Logo'],
        variations: {
          hover: '#1d4ed8',
          active: '#1e40af',
          disabled: '#94a3b8'
        }
      },
      {
        id: 'color-2',
        name: 'Sky Light',
        hex: '#3b82f6',
        purpose: 'Secondary Action',
        recommendedUsage: ['Secondary buttons', 'Links', 'Accent elements'],
        variations: {
          hover: '#2563eb',
          active: '#1d4ed8',
          disabled: '#cbd5e1'
        }
      },
      {
        id: 'color-3',
        name: 'Cloud White',
        hex: '#f8fafc',
        purpose: 'Background',
        recommendedUsage: ['Main background', 'Card backgrounds', 'Modal overlays'],
        variations: {
          hover: '#f1f5f9',
          active: '#e2e8f0'
        }
      },
      {
        id: 'color-4',
        name: 'Slate Gray',
        hex: '#475569',
        purpose: 'Text Primary',
        recommendedUsage: ['Headings', 'Body text', 'Form labels'],
        variations: {
          hover: '#334155',
          active: '#1e293b',
          disabled: '#94a3b8'
        }
      },
      {
        id: 'color-5',
        name: 'Soft Gray',
        hex: '#64748b',
        purpose: 'Text Secondary',
        recommendedUsage: ['Subtitles', 'Captions', 'Placeholder text'],
        variations: {
          hover: '#475569',
          active: '#334155',
          disabled: '#cbd5e1'
        }
      }
    ],
    harmonyRule: 'Monochromatic with neutral complements',
    environment: 'Web Application',
    createdAt: new Date().toISOString()
  },
  {
    id: 'palette-2',
    name: 'Warm Minimalist',
    description: 'A warm, earthy palette for creative applications',
    colors: [
      {
        id: 'color-6',
        name: 'Terracotta',
        hex: '#ea580c',
        purpose: 'Primary Brand Color',
        recommendedUsage: ['Call-to-action buttons', 'Important highlights', 'Brand elements'],
        variations: {
          hover: '#dc2626',
          active: '#b91c1c',
          disabled: '#fca5a5'
        }
      },
      {
        id: 'color-7',
        name: 'Warm Beige',
        hex: '#fef3c7',
        purpose: 'Background Accent',
        recommendedUsage: ['Section backgrounds', 'Card highlights', 'Notification backgrounds'],
        variations: {
          hover: '#fef08a',
          active: '#fde047'
        }
      },
      {
        id: 'color-8',
        name: 'Cream',
        hex: '#fffbeb',
        purpose: 'Main Background',
        recommendedUsage: ['Page background', 'Content areas', 'Form backgrounds'],
        variations: {
          hover: '#fef3c7',
          active: '#fef08a'
        }
      },
      {
        id: 'color-9',
        name: 'Charcoal',
        hex: '#374151',
        purpose: 'Text Primary',
        recommendedUsage: ['Headings', 'Body text', 'Navigation'],
        variations: {
          hover: '#1f2937',
          active: '#111827',
          disabled: '#9ca3af'
        }
      },
      {
        id: 'color-10',
        name: 'Warm Gray',
        hex: '#6b7280',
        purpose: 'Text Secondary',
        recommendedUsage: ['Subtitles', 'Captions', 'Meta information'],
        variations: {
          hover: '#4b5563',
          active: '#374151',
          disabled: '#d1d5db'
        }
      }
    ],
    harmonyRule: 'Complementary with warm undertones',
    environment: 'Mobile Application',
    createdAt: new Date().toISOString()
  }
];

/**
 * Simulates API delay for realistic user experience
 */
const simulateNetworkDelay = (ms: number = 2000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Generates a palette based on user description
 * Currently uses mock data but structured for easy API integration
 */
export const generatePalette = async (
  request: PaletteGenerationRequest
): Promise<PaletteGenerationResponse> => {
  try {
    // Simulate network delay
    await simulateNetworkDelay(1500 + Math.random() * 1000);

    // Validate request
    if (!request.description?.trim()) {
      throw new Error('Description is required');
    }

    // Simple logic to return different mock palettes based on description keywords
    const description = request.description.toLowerCase();
    let selectedPalette: GeneratedPalette;

    if (description.includes('warm') || description.includes('earth') || description.includes('creative')) {
      selectedPalette = mockPaletteData[1];
    } else {
      selectedPalette = mockPaletteData[0];
    }

    // Generate a unique ID for this request
    const generatedPalette: GeneratedPalette = {
      ...selectedPalette,
      id: `palette-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      data: generatedPalette
    };

  } catch (error) {
    console.error('Error generating palette:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
};

/**
 * Future integration point for real AI API
 * This function will be implemented when connecting to actual AI services
 */
export const generatePaletteWithAI = async (
  request: PaletteGenerationRequest
): Promise<PaletteGenerationResponse> => {
  // TODO: Implement actual AI API integration
  // This could integrate with OpenAI, N8N workflows, or other AI services

  const endpoint = process.env.NEXT_PUBLIC_AI_ENDPOINT || '/api/generate-palette';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers as needed
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('AI API Error:', error);
    // Fallback to mock data if AI service is unavailable
    return await generatePalette(request);
  }
};

/**
 * Export palette data in different formats
 */
export const exportPalette = (palette: GeneratedPalette, format: 'css-variables' | 'json' | 'scss' | 'tailwind'): string => {
  switch (format) {
    case 'css-variables':
      return generateCSSVariables(palette);
    case 'json':
      return JSON.stringify(palette, null, 2);
    case 'scss':
      return generateSCSSVariables(palette);
    case 'tailwind':
      return generateTailwindConfig(palette);
    default:
      return JSON.stringify(palette, null, 2);
  }
};

/**
 * Helper function to generate CSS variables
 */
const generateCSSVariables = (palette: GeneratedPalette): string => {
  const variables = palette.colors.map(color => {
    const name = color.name.toLowerCase().replace(/\s+/g, '-');
    let css = `  --color-${name}: ${color.hex};`;

    if (color.variations) {
      if (color.variations.hover) css += `\n  --color-${name}-hover: ${color.variations.hover};`;
      if (color.variations.active) css += `\n  --color-${name}-active: ${color.variations.active};`;
      if (color.variations.disabled) css += `\n  --color-${name}-disabled: ${color.variations.disabled};`;
    }

    return css;
  }).join('\n');

  return `:root {\n${variables}\n}`;
};

/**
 * Helper function to generate SCSS variables
 */
const generateSCSSVariables = (palette: GeneratedPalette): string => {
  return palette.colors.map(color => {
    const name = color.name.toLowerCase().replace(/\s+/g, '-');
    let scss = `$color-${name}: ${color.hex};`;

    if (color.variations) {
      if (color.variations.hover) scss += `\n$color-${name}-hover: ${color.variations.hover};`;
      if (color.variations.active) scss += `\n$color-${name}-active: ${color.variations.active};`;
      if (color.variations.disabled) scss += `\n$color-${name}-disabled: ${color.variations.disabled};`;
    }

    return scss;
  }).join('\n');
};

/**
 * Helper function to generate Tailwind config
 */
const generateTailwindConfig = (palette: GeneratedPalette): string => {
  const colors = palette.colors.reduce((acc, color) => {
    const name = color.name.toLowerCase().replace(/\s+/g, '-');
    acc[name] = {
      DEFAULT: color.hex,
      ...(color.variations && {
        hover: color.variations.hover,
        active: color.variations.active,
        disabled: color.variations.disabled
      })
    };
    return acc;
  }, {} as Record<string, any>);

  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8)}
    }
  }
}`;
};
