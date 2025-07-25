import { PaletteGenerator } from "@/modules/palette-generator";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Color<span className="text-primary">Gen</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate professional color palettes with artificial intelligence.
            Describe your project and get a perfect palette instantly.
          </p>
        </div>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center space-y-8">
          <PaletteGenerator />
        </main>
      </div>

      {/* Footer */}
      <Footer className="mt-16" />
    </div>
  );
}
