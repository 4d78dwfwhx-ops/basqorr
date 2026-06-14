import "../app/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-tajawal",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "BASQOR | منصة بسكور للسيارات",
  description:
    "كل خدمات وقطع غيار السيارات السعودية في مكان واحد: قطع غيار جديدة ومستعملة، مناديب، ورش، فحص، سحب وصيانة، متاجر متخصصة. منصة بسكور.",
  keywords:
    "BASQOR, بسكور, قطع غيار السيارات, تشاليح, فحص سيارات, منصة سيارات, منصة صيانة سيارات",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "BASQOR | منصة السيارات السعودية",
    description: "منصة تجمع كل احتياجات سيارتك: جديدة، مستعملة، خدمات، تشاليح.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="bg-grayBg text-dark font-tajawal min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
