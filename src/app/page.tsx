import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Categories } from "@/components/Categories";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
