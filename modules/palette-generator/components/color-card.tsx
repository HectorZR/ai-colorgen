"use client";
/**
 * ColorCard component for displaying individual colors in a palette
 *
 * This component shows a color with its information, variations, and copy functionality.
 * It's part of the presentation layer for displaying generated palette results.
 */

import { useState } from "react";
import { Copy, Check, Eye, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Color } from "../types";
import { copyToClipboard, getTextColor, isLightColor } from "../utils";

interface ColorCardProps {
  color: Color;
  className?: string;
  showVariations?: boolean;
  compact?: boolean;
}

const ColorCard = ({
  color,
  className,
  showVariations = true,
  compact = false,
}: ColorCardProps) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleCopy = async (text: string, itemType: string) => {
    const result = await copyToClipboard(text);
    if (result.success) {
      setCopiedItem(itemType);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const textColor = getTextColor(color.hex);
  const isLight = isLightColor(color.hex);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        compact ? "w-full" : "w-full max-w-sm",
        className,
      )}
    >
      {/* Color Preview Section */}
      <div
        className={cn(
          "relative transition-all duration-300",
          compact ? "h-20" : "h-32",
          previewMode ? "h-48" : "",
        )}
        style={{ backgroundColor: color.hex }}
      >
        {/* Color overlay with text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4" style={{ color: textColor }}>
            <h3
              className={cn(
                "font-bold transition-all duration-300",
                compact ? "text-lg" : "text-xl",
                previewMode ? "text-2xl" : "",
              )}
            >
              {color.hex.toUpperCase()}
            </h3>
            {!compact && (
              <p className="text-sm opacity-90 mt-1">{color.name}</p>
            )}
          </div>
        </div>

        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant={isLight ? "default" : "secondary"}
            onClick={() => setPreviewMode(!previewMode)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={isLight ? "default" : "secondary"}
            onClick={() => handleCopy(color.hex, "hex")}
            className="h-8 w-8 p-0"
          >
            {copiedItem === "hex" ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Color Information */}
      <CardHeader className={cn("pb-2", compact ? "p-3" : "p-4")}>
        <div className="flex items-center justify-between">
          <CardTitle
            className={cn(
              "flex items-center gap-2",
              compact ? "text-lg" : "text-xl",
            )}
          >
            <Palette className="h-5 w-5 text-primary" />
            {color.name}
          </CardTitle>
          {!compact && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleCopy(color.hex, "hex-alt")}
              className="h-8 px-2 text-xs"
            >
              {copiedItem === "hex-alt" ? (
                <>
                  <Check className="h-3 w-3 mr-1" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </>
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent
        className={cn("space-y-3", compact ? "p-3 pt-0" : "p-4 pt-0")}
      >
        {/* Purpose and Usage */}
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Purpose</p>
            <p className="text-sm">{color.purpose}</p>
          </div>

          {!compact &&
            color.recommendedUsage &&
            color.recommendedUsage.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Recommended usage
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {color.recommendedUsage.map((usage, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                    >
                      {usage}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Color Variations */}
        {showVariations && color.variations && !compact && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Variations
            </p>
            <div className="space-y-2">
              {color.variations.hover && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{ backgroundColor: color.variations.hover }}
                    />
                    <span className="text-sm">Hover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-muted-foreground font-mono">
                      {color.variations.hover}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleCopy(color.variations!.hover!, "hover")
                      }
                      className="h-6 w-6 p-0"
                    >
                      {copiedItem === "hover" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {color.variations.active && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{ backgroundColor: color.variations.active }}
                    />
                    <span className="text-sm">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-muted-foreground font-mono">
                      {color.variations.active}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleCopy(color.variations!.active!, "active")
                      }
                      className="h-6 w-6 p-0"
                    >
                      {copiedItem === "active" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {color.variations.disabled && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border border-border"
                      style={{ backgroundColor: color.variations.disabled }}
                    />
                    <span className="text-sm">Disabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-muted-foreground font-mono">
                      {color.variations.disabled}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleCopy(color.variations!.disabled!, "disabled")
                      }
                      className="h-6 w-6 p-0"
                    >
                      {copiedItem === "disabled" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Copy confirmation */}
        {copiedItem && (
          <div className="text-center">
            <p className="text-xs text-green-600 dark:text-green-400 animate-fade-in">
              Color copied to clipboard!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorCard;
