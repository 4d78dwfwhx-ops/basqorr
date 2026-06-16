import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BASQOR | بسكور - كل قطعة. كل مكان. بثقة.",
  description: "منصة السيارات وقطع الغيار الرائدة في السعودية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-dark-950 text-white font-arabic">
        {children}
      </body>
    </html>
  );
}
