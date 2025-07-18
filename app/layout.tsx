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
  title: "ColorGen - AI-Powered Color Palette Generator",
  description:
    "Generate professional color palettes with artificial intelligence. Describe your project and get a perfect palette instantly.",
  keywords: [
    "color palette",
    "generator",
    "artificial intelligence",
    "design",
    "colors",
    "UI",
    "UX",
  ],
  authors: [{ name: "ColorGen Team" }],
  creator: "ColorGen",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "ColorGen - AI-Powered Color Palette Generator",
    description:
      "Generate professional color palettes with artificial intelligence",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorGen - AI-Powered Color Palette Generator",
    description:
      "Generate professional color palettes with artificial intelligence",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
