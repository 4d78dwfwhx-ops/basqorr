cat > src/app/page.tsx << 'EOF'
"use client";

import Header from "@/components/header";
import HeroSearch from "@/components/hero-search";
import ServicesGrid from "@/components/services-grid";
import BrandsSection from "@/components/brands-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSearch />
      <ServicesGrid />
      <BrandsSection />
      <Footer />
    </main>
  );
}
EOF
