"use client";
/**
 * PaletteForm component for user input
 *
 * This component provides the main form interface for users to describe
 * their palette requirements. It uses @tanstack/react-form for form management
 * and validation, following the modular architecture pattern.
 */

import React from "react";
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

const PaletteForm: React.FC<PaletteFormProps> = ({
  onSubmit,
  loadingState,
  className,
}) => {
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
    "Aplicación web de fintech, 6 colores, estilo profesional con azules corporativos y acentos verdes para acciones positivas, armonía análoga",
    "App móvil de wellness, 4 colores, paleta calmante con tonos tierra y verdes suaves, diseño minimalista, armonía monocromática",
    "Dashboard de analytics, 5 colores, colores vibrantes para gráficos con fondo neutro, necesito buenos contrastes para accesibilidad",
    "E-commerce de moda, 7 colores, paleta sofisticada con negros, blancos y un color accent rosa dorado, estilo premium",
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
          Generador de Paletas con IA
        </CardTitle>
        <p className="text-muted-foreground">
          Describe tu proyecto y genera una paleta de colores personalizada
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
                  Describe tu paleta ideal
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Ejemplo: Aplicación web, 5 colores, estilo minimalista con tonos azulados fríos, armonía complementaria. Incluye información sobre el tipo de proyecto, cantidad de colores deseados, estilo visual, colores preferidos y reglas de armonía."
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
                <h4 className="font-medium text-sm">
                  Tips para mejores resultados
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • Especifica el tipo de proyecto (web, móvil, desktop)
                  </li>
                  <li>• Menciona la cantidad de colores que necesitas</li>
                  <li>
                    • Describe el estilo visual (minimalista, vibrante,
                    corporativo)
                  </li>
                  <li>• Incluye colores de referencia si los tienes</li>
                  <li>• Especifica la regla de armonía deseada</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Example Descriptions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Ejemplos de descripciones:</h4>
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
                    Generando Paleta...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generar Paleta
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
              Analizando tu descripción y generando la paleta perfecta...
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
