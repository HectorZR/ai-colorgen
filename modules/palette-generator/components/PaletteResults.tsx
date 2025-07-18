"use client";
/**
 * PaletteResults component for displaying generated palette
 *
 * This component displays the complete generated palette with all colors,
 * export options, and metadata. It's part of the presentation layer
 * for showing the results of the palette generation process.
 */

import { useState } from "react";
import {
  Download,
  Share2,
  Palette,
  Calendar,
  Target,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GeneratedPalette, ExportFormat } from "../types";
import { copyToClipboard, downloadPalette, formatDate } from "../utils";
import { exportPalette } from "../services/palette-api";
import ColorCard from "./ColorCard";

interface PaletteResultsProps {
  palette: GeneratedPalette;
  onNewGeneration?: () => void;
  className?: string;
}

const PaletteResults = ({
  palette,
  onNewGeneration,
  className,
}: PaletteResultsProps) => {
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(
    null,
  );
  const [copiedPalette, setCopiedPalette] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    setExportingFormat(format);
    try {
      downloadPalette(palette, format);
    } catch (error) {
      console.error("Error exporting palette:", error);
    } finally {
      setExportingFormat(null);
    }
  };

  const handleCopyPalette = async () => {
    const paletteText = palette.colors
      .map((color) => `${color.name}: ${color.hex}`)
      .join("\n");
    const result = await copyToClipboard(paletteText);
    if (result.success) {
      setCopiedPalette(true);
      setTimeout(() => setCopiedPalette(false), 2000);
    }
  };

  const handleSharePalette = async () => {
    const shareData = {
      title: `Paleta: ${palette.name}`,
      text: `Mira esta paleta de colores generada con IA: ${palette.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
        // Fallback to copy to clipboard
        await copyToClipboard(`${shareData.title}\n${shareData.text}`);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      await copyToClipboard(`${shareData.title}\n${shareData.text}`);
    }
  };

  const exportFormats: {
    format: ExportFormat;
    label: string;
    description: string;
  }[] = [
    {
      format: "css-variables",
      label: "CSS Variables",
      description: "CSS variables to use in your project",
    },
    {
      format: "json",
      label: "JSON",
      description: "JSON format for APIs and configurations",
    },
    {
      format: "scss",
      label: "SCSS",
      description: "SCSS variables for preprocessors",
    },
    {
      format: "tailwind",
      label: "Tailwind Config",
      description: "Configuration for Tailwind CSS",
    },
  ];

  return (
    <div className={cn("w-full max-w-6xl mx-auto space-y-8", className)}>
      {/* Palette Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">{palette.name}</CardTitle>
              </div>
              <CardDescription className="text-base">
                {palette.description}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleCopyPalette}
                className="flex items-center gap-2"
              >
                {copiedPalette ? (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Copy Palette
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleSharePalette}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              {onNewGeneration && (
                <Button
                  onClick={onNewGeneration}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  New Palette
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Environment:</span>
              <span className="text-muted-foreground">
                {palette.environment}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Harmony:</span>
              <span className="text-muted-foreground">
                {palette.harmonyRule}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Generated:</span>
              <span className="text-muted-foreground">
                {formatDate(palette.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {palette.colors.map((color, index) => (
          <ColorCard
            key={color.id || index}
            color={color}
            showVariations={true}
            compact={false}
          />
        ))}
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Palette
          </CardTitle>
          <CardDescription>
            Download your palette in different formats to use in your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportFormats.map(({ format, label, description }) => (
              <Button
                key={format}
                variant="outline"
                onClick={() => handleExport(format)}
                disabled={exportingFormat === format}
                className="h-auto p-4 flex flex-col items-start gap-2 text-left"
              >
                <div className="flex items-center gap-2 w-full">
                  {exportingFormat === format ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  <span className="font-medium">{label}</span>
                </div>
                <span className="text-xs text-muted-foreground text-left">
                  {description}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Preview Strip */}
      <Card>
        <CardHeader>
          <CardTitle>Palette Preview</CardTitle>
          <CardDescription>
            See how your complete palette looks in action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Horizontal color strip */}
            <div className="flex rounded-lg overflow-hidden shadow-sm border border-border">
              {palette.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex-1 h-16 flex items-center justify-center relative group"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      color:
                        color.hex === "#ffffff" || color.hex === "#fff"
                          ? "#000"
                          : "#fff",
                    }}
                  >
                    {color.hex}
                  </span>
                </div>
              ))}
            </div>

            {/* Usage example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Usage example:</h4>
                <div
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: palette.colors[0]?.hex || "#ffffff",
                    borderColor: palette.colors[1]?.hex || "#e5e7eb",
                  }}
                >
                  <h5
                    className="font-semibold mb-2"
                    style={{
                      color: palette.colors[3]?.hex || "#000000",
                    }}
                  >
                    Project Title
                  </h5>
                  <p
                    className="text-sm mb-3"
                    style={{
                      color: palette.colors[4]?.hex || "#666666",
                    }}
                  >
                    This is an example of how your palette would look applied in
                    a real design.
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded text-sm font-medium"
                      style={{
                        backgroundColor: palette.colors[1]?.hex || "#3b82f6",
                        color: "#ffffff",
                      }}
                    >
                      Primary Action
                    </button>
                    <button
                      className="px-4 py-2 rounded text-sm font-medium border"
                      style={{
                        borderColor: palette.colors[1]?.hex || "#3b82f6",
                        color: palette.colors[1]?.hex || "#3b82f6",
                      }}
                    >
                      Secondary
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Quick codes:</h4>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm space-y-1">
                  {palette.colors.slice(0, 5).map((color, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{color.name}:</span>
                      <span className="text-primary">{color.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaletteResults;
