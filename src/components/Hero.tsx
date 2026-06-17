"use client";
import { motion } from "framer-motion";
import { Search, TrendingUp, Award, Clock, Shield, ChevronLeft, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-azure/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(212, 168, 83, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 83, 0.5) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-gold/30 mb-8">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold">المنصة الرائدة في السعودية 🇸🇦</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-[1.1]">
            <span className="gradient-text">كل قطعة.</span><br />
            <span className="text-white">كل مكان.</span><br />
            <span className="text-gold">بثقة.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            منصة BASQOR المتكاملة لقطع الغيار والسيارات في المملكة العربية السعودية
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-3xl mx-auto mb-12">
            <div className="glass-strong rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-5 py-4">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input type="text" placeholder="ابحث عن قطعة غيار، سيارة، أو ورشة..." className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-right text-lg" />
              </div>
              <button className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-xl">
                <span className="font-bold">بحث</span>
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {["تويوتا كامري", "فرامل", "بطارية", "زيت محرك"].map((tag) => (
                <button key={tag} className="px-4 py-1.5 rounded-full text-sm glass text-gray-300 hover:text-gold hover:border-gold/30 transition-all">{tag}</button>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[{ icon: TrendingUp, value: "2.4M+", label: "قطعة غيار" }, { icon: Award, value: "18K+", label: "تاجر موثوق" }, { icon: Clock, value: "98%", label: "تسليم في الوقت" }, { icon: Shield, value: "24/7", label: "دعم SOS" }].map((stat) => (
              <motion.div key={stat.label} whileHover={{ scale: 1.05 }} className="glass rounded-2xl p-5 text-center card-hover">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 mb-3"><stat.icon className="w-6 h-6 text-gold" /></div>
                <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary py-4 px-10 rounded-xl text-lg">ابدأ التسوق الآن</button>
            <button className="btn-secondary py-4 px-10 rounded-xl text-lg">سجل ورشتك</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
