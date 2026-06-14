import HeroSearch from "@/components/hero-search";
import { ServicesGrid } from "@/components/services-grid";
import { BrandsSection } from "@/components/brands-section";
import { Card, CardContent } from "@shadcn/ui/card";
import { BarChart, MessageCircle, ShieldCheck, Zap } from "lucide-react";

function FeaturesRow() {
  return (
    <section className="my-10 grid md:grid-cols-4 gap-6">
      {/* ... المحتوى نفسه ... */}
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "120,000+", label: "قطعة متاحة حاليًا" },
    { value: "230+", label: "متجر وتاجر" },
    { value: "80+", label: "مقدم خدمة" },
  ];
  return (
    <section className="bg-white border mt-16 rounded-xl p-6 md:p-10 grid md:grid-cols-3 gap-6 text-center items-center shadow-sm">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-2 items-center justify-center">
          <div className="text-3xl font-extrabold text-primary">{s.value}</div>
          <div className="text-base md:text-lg font-medium text-dark/70">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-white min-h-screen w-full rtl font-sans">
      <main className="mx-auto w-full max-w-7xl px-4 md:px-0">
        <HeroSearch />
        <FeaturesRow />
        <ServicesGrid />
        <BrandsSection />
        <StatsSection />
      </main>
    </div>
  );
}
