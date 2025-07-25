/**
 * Footer component for the ColorGen application
 *
 * A simple, clean footer component that provides attribution and branding
 * information for the palette generator application.
 */

import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={cn(
        "w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Developed with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>and</span>
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span>to power your creativity</span>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} ColorGen. Color palettes generated
              with artificial intelligence.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Powered by AI</span>
            <span>•</span>
            <span>Next.js</span>
            <span>•</span>
            <span>TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
