"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-dark-950 to-azure/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="glass-strong rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"><span className="gradient-text">جاهز للبدء؟</span></h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">انضم إلى آلاف العملاء والتجار الذين يثقون في BASQOR يومياً</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary py-4 px-10 rounded-xl text-lg inline-flex items-center gap-2"><span>ابدأ الآن مجاناً</span><ArrowLeft className="w-5 h-5" /></button>
            <button className="btn-secondary py-4 px-10 rounded-xl text-lg inline-flex items-center gap-2"><Phone className="w-5 h-5" /><span>تواصل معنا</span></button>
          </div>
          <p className="text-gray-400 mt-8 text-sm">✓ مجاني للتسجيل  ✓ بدون بطاقة ائتمان  ✓ دعم 24/7</p>
        </motion.div>
      </div>
    </section>
  );
}
