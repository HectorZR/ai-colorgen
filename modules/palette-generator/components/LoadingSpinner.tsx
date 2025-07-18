"use client";
/**
 * LoadingSpinner component for palette generation
 *
 * This component displays a loading animation while the palette is being generated,
 * providing visual feedback to users during the API call process.
 */

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = "md",
  message = "Generando paleta...",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8",
        className,
      )}
    >
      {/* Animated spinner */}
      <div className="relative">
        <div
          className={cn(
            "animate-spin rounded-full border-4 border-primary/20",
            sizeClasses[size],
          )}
        >
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>

        {/* Inner pulsing dot */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            sizeClasses[size],
          )}
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Loading message */}
      {message && (
        <div className="text-center space-y-2">
          <p
            className={cn("font-medium text-foreground", textSizeClasses[size])}
          >
            {message}
          </p>
          <p className="text-sm text-muted-foreground">
            Esto puede tomar unos segundos...
          </p>
        </div>
      )}

      {/* Animated dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
