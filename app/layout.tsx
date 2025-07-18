import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ColorGen - Generador de Paletas con IA",
  description:
    "Genera paletas de colores profesionales con inteligencia artificial. Describe tu proyecto y obtén una paleta perfecta al instante.",
  keywords: [
    "paleta de colores",
    "generador",
    "inteligencia artificial",
    "diseño",
    "colores",
    "UI",
    "UX",
  ],
  authors: [{ name: "ColorGen Team" }],
  creator: "ColorGen",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "ColorGen - Generador de Paletas con IA",
    description:
      "Genera paletas de colores profesionales con inteligencia artificial",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorGen - Generador de Paletas con IA",
    description:
      "Genera paletas de colores profesionales con inteligencia artificial",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
