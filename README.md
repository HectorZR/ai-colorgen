# ColorGen - AI-Powered Color Palette Generator

A modern web application for generating professional color palettes using artificial intelligence. Built with Next.js 15, TailwindCSS v4, and Shadcn/ui.

## 🎯 Features

- **AI Generation**: Describe your project and get personalized palettes
- **Intuitive Interface**: Single form with real-time validation
- **Complete Visualization**: Detailed information for each color with variations
- **Multiple Exports**: CSS Variables, JSON, SCSS, and Tailwind Config
- **Responsive Design**: Optimized for desktop and mobile
- **Modular Architecture**: Code organized by layers and modules

## 🚀 Technologies

- **Frontend**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **Components**: Shadcn/ui
- **Forms**: @tanstack/react-form
- **Icons**: Lucide React
- **Typing**: TypeScript
- **Package Manager**: pnpm

## 🏗️ Architecture

The project follows a modular layered architecture:

```
/app                          # Next.js routing
/modules                      # Functionality modules
  /palette-generator          # Main module
    /components              # Module components
    /services               # Business logic and APIs
    /types                  # TypeScript types
    /utils                  # Specific utilities
    index.tsx              # Entry point
/components                  # Shared components
  /ui                       # Base UI components
/lib                        # General utilities
/types                      # Global types
```

## 📦 Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/colorgen.git
cd colorgen
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Configure environment variables**:
```bash
cp .env.example .env.local
# Edit .env.local with your configurations
```

4. **Run in development**:
```bash
pnpm dev
```

## 🎨 Usage

### Palette Generation

1. **Describe your project**: Include information about:
   - Application type (web, mobile, desktop)
   - Desired number of colors
   - Visual style (minimalist, corporate, vibrant)
   - Reference colors
   - Color harmony rule

2. **Generate palette**: Click "Generate Palette" and wait for results

3. **Explore results**: Each color includes:
   - Hexadecimal code
   - Descriptive name
   - Specific purpose
   - Variations (hover, active, disabled)
   - Recommended usage elements

4. **Export your palette**: Available in multiple formats:
   - CSS Variables
   - JSON
   - SCSS
   - Tailwind Config

### Example Descriptions

```
Fintech web application, 6 colors, professional style with corporate blues
and green accents for positive actions, analogous harmony
```

```
Wellness mobile app, 4 colors, calming palette with earth tones and soft greens,
minimalist design, monochromatic harmony
```

## 🔧 Development

### Component Structure

```typescript
// Module component example
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaletteGenerationRequest } from "../types";
import { generatePalette } from "../services/palette-api";

const PaletteForm = ({ onSubmit }: PaletteFormProps) => {
  // Component logic
};
```

### Services and APIs

```typescript
// Palette generation service
export const generatePalette = async (
  request: PaletteGenerationRequest
): Promise<PaletteGenerationResponse> => {
  // Generation logic (currently mock)
  // Ready for real API integration
};
```

### TypeScript Types

```typescript
// Well-defined types for the entire application
interface GeneratedPalette {
  id: string;
  name: string;
  colors: Color[];
  harmonyRule: string;
  environment: string;
}
```

## 🎯 Implemented Features

### ✅ Comprehensive Form
- Long text field with validation
- Description examples
- Real-time validation
- Loading states

### ✅ Palette Generation
- Mock service with realistic data
- Error handling
- Loading states
- Structured response

### ✅ Results Visualization
- Individual color cards
- Detailed information
- State variations
- Interactive preview

### ✅ Export
- Multiple formats
- File downloads
- Copy to clipboard
- Share palettes

### ✅ UI/UX
- Responsive design
- Light/dark theme
- Smooth animations
- Visual feedback

## 🔮 Upcoming Features

- [ ] Real AI API integration
- [ ] Favorites system
- [ ] Palette history
- [ ] Real-time collaboration
- [ ] Accessibility analysis
- [ ] Figma/Adobe export

### Docker

```bash
# Build image
docker build -t colorgen .

# Run container
docker run -p 3000:3000 colorgen
```

### Code Standards

- Use TypeScript for strong typing
- Follow naming conventions
- Document components and functions
- Maintain modular architecture
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the framework
- [TailwindCSS](https://tailwindcss.com/) for the styling system
- [Shadcn/ui](https://ui.shadcn.com/) for the components
- [Lucide](https://lucide.dev/) for the icons
- [Vercel](https://vercel.com/) for hosting

## 📞 Contact

- **Author**: ColorGen Team
- **Email**: hello@colorgen.app
- **Website**: [colorgen.app](https://colorgen.app)
- **GitHub**: [@colorgen](https://github.com/colorgen)

---

**Developed with ❤️ and ✨ to power your creativity**
