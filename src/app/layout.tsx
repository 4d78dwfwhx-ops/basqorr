import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "BASQOR | بسكور - كل قطعة. كل مكان. بثقة.",
  description: "منصة السيارات وقطع الغيار الرائدة في السعودية - سوق متكامل B2B2C",
  keywords: ["سيارات", "قطع غيار", "السعودية", "BASQOR", "بسكور", "ورشة", "SOS"],
  authors: [{ name: "BASQOR Team" }],
  openGraph: {
    title: "BASQOR | بسكور - كل قطعة. كل مكان. بثقة.",
    description: "منصة السيارات وقطع الغيار الرائدة في السعودية",
    type: "website",
    locale: "ar_SA",
    siteName: "BASQOR",
  },
  twitter: {
    card: "summary_large_image",
    title: "BASQOR | بسكور",
    description: "منصة السيارات وقطع الغيار الرائدة في السعودية",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-arabic antialiased bg-dark-950 text-foreground min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
