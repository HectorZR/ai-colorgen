"use client";
/**
 * PaletteGenerator - Main component for the palette generation functionality
 *
 * This component orchestrates the entire palette generation flow, combining
 * the form input, loading states, and results display. It serves as the
 * controller in the presentation layer, managing state and coordinating
 * between different UI components and services.
 */

import { useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PaletteGenerationRequest,
  GeneratedPalette,
  LoadingState,
  PaletteGenerationResponse,
} from "../types";
import { generatePalette } from "../services/palette-api";
import PaletteForm from "./PaletteForm";
import PaletteResults from "./PaletteResults";
import LoadingSpinner from "./LoadingSpinner";

interface PaletteGeneratorProps {
  className?: string;
  onPaletteGenerated?: (palette: GeneratedPalette) => void;
}

const PaletteGenerator = ({
  className,
  onPaletteGenerated,
}: PaletteGeneratorProps) => {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [generatedPalette, setGeneratedPalette] =
    useState<GeneratedPalette | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRequest, setLastRequest] =
    useState<PaletteGenerationRequest | null>(null);

  /**
   * Handles the palette generation process
   * Manages loading states and error handling
   */
  const handleGeneratePalette = async (request: PaletteGenerationRequest) => {
    try {
      setLoadingState("generating");
      setError(null);
      setLastRequest(request);

      // Call the palette generation service
      const response: PaletteGenerationResponse =
        await generatePalette(request);

      if (response.success && response.data) {
        setGeneratedPalette(response.data);
        setLoadingState("success");

        // Notify parent component if callback is provided
        if (onPaletteGenerated) {
          onPaletteGenerated(response.data);
        }
      } else {
        throw new Error(response.error || "Failed to generate palette");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      setLoadingState("error");
      console.error("Error generating palette:", err);
    }
  };

  /**
   * Handles retry functionality
   * Reuses the last successful request parameters
   */
  const handleRetry = () => {
    if (lastRequest) {
      handleGeneratePalette(lastRequest);
    }
  };

  /**
   * Resets the component to initial state for new generation
   */
  const handleNewGeneration = () => {
    setLoadingState("idle");
    setGeneratedPalette(null);
    setError(null);
    setLastRequest(null);
  };

  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Form Section - Always visible */}
      {(loadingState === "idle" || loadingState === "error") && (
        <PaletteForm
          onSubmit={handleGeneratePalette}
          loadingState={loadingState}
        />
      )}

      {/* Loading State */}
      {loadingState === "generating" && (
        <div className="flex justify-center">
          <LoadingSpinner
            size="lg"
            message="Generating your perfect palette..."
            className="w-full max-w-md"
          />
        </div>
      )}

      {/* Error State */}
      {loadingState === "error" && error && (
        <Card className="w-full max-w-2xl mx-auto border-destructive/50 bg-destructive/5">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-destructive">
              Error generating palette
            </CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Please review your description and try again. If the problem
              persists, check your internet connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                onClick={handleRetry}
                variant="default"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </Button>
              <Button
                onClick={handleNewGeneration}
                variant="outline"
                className="flex items-center gap-2"
              >
                New description
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success State - Results */}
      {loadingState === "success" && generatedPalette && (
        <PaletteResults
          palette={generatedPalette}
          onNewGeneration={handleNewGeneration}
        />
      )}

      {/* Debug Information - Only in development */}
      {process.env.NODE_ENV === "development" && (
        <Card className="w-full max-w-2xl mx-auto bg-muted/30">
          <CardHeader>
            <CardTitle className="text-sm">Debug Info</CardTitle>
          </CardHeader>
          <CardContent className="text-xs font-mono space-y-1">
            <div>Loading State: {loadingState}</div>
            <div>Has Palette: {generatedPalette ? "Yes" : "No"}</div>
            <div>Has Error: {error ? "Yes" : "No"}</div>
            <div>Last Request: {lastRequest ? "Available" : "None"}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaletteGenerator;
