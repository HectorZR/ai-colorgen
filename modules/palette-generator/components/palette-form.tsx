"use client";
/**
 * PaletteForm component for user input
 *
 * This component provides the main form interface for users to describe
 * their palette requirements. It uses @tanstack/react-form for form management
 * and validation, following the modular architecture pattern.
 */

import { useForm } from "@tanstack/react-form";
import { Palette, Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PaletteGenerationRequest, LoadingState } from "../types";
import { validateDescription } from "../utils";

interface PaletteFormProps {
  onSubmit: (data: PaletteGenerationRequest) => void;
  loadingState: LoadingState;
  className?: string;
}

const PaletteForm = ({
  onSubmit,
  loadingState,
  className,
}: PaletteFormProps) => {
  const form = useForm({
    defaultValues: {
      description: "",
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  const isLoading = loadingState === "generating";

  const exampleDescriptions = [
    "Fintech web application, 6 colors, professional style with corporate blues and green accents for positive actions, analogous harmony",
    "Wellness mobile app, 4 colors, calming palette with earth tones and soft greens, minimalist design, monochromatic harmony",
    "Analytics dashboard, 5 colors, vibrant colors for charts with neutral background, need good contrasts for accessibility",
    "Fashion e-commerce, 7 colors, sophisticated palette with blacks, whites and a rose gold accent color, premium style",
  ];

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            <Palette className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">
          AI Color Palette Generator
        </CardTitle>
        <p className="text-muted-foreground">
          Describe your project and generate a personalized color palette
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Main Description Field */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) => {
                const errors = validateDescription(value);
                return errors.length > 0 ? errors.join(", ") : undefined;
              },
              onSubmit: ({ value }) => {
                const errors = validateDescription(value);
                return errors.length > 0 ? errors.join(", ") : undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Describe your ideal palette
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Example: Web application, 5 colors, minimalist style with cool blue tones, complementary harmony. Include information about project type, desired number of colors, visual style, preferred colors, and harmony rules."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  disabled={isLoading}
                  className="min-h-[120px] resize-none"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{field.state.value.length}/1000 caracteres</span>
                  {field.state.meta.errors && (
                    <span className="text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </span>
                  )}
                </div>
              </div>
            )}
          </form.Field>

          {/* Helper Information */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Tips for better results</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Specify the project type (web, mobile, desktop)</li>
                  <li>• Mention the number of colors you need</li>
                  <li>
                    • Describe the visual style (minimalist, vibrant, corporate)
                  </li>
                  <li>• Include reference colors if you have them</li>
                  <li>• Specify the desired harmony rule</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Example Descriptions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Example descriptions:</h4>
            <div className="grid gap-2">
              {exampleDescriptions.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => form.setFieldValue("description", example)}
                  disabled={isLoading}
                  className="text-left p-3 text-sm border border-border rounded-md hover:bg-muted/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isLoading}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                    Generating Palette...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Palette
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Loading State Message */}
        {isLoading && (
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Analyzing your description and generating the perfect palette...
            </p>
            <div className="flex justify-center space-x-1">
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
        )}
      </CardContent>
    </Card>
  );
};

export default PaletteForm;
