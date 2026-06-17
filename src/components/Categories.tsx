"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const categories = [
  { name: "قطع أصلية", icon: "🏭", count: "850K+", color: "from-blue-500/20 to-blue-600/20" },
  { name: "قطع بديلة", icon: "⚙️", count: "620K+", color: "from-emerald/20 to-emerald/30" },
  { name: "مستعملة", icon: "🔄", count: "340K+", color: "from-amber-500/20 to-amber-600/20" },
  { name: "تشاليح", icon: "🔧", count: "180K+", color: "from-crimson/20 to-crimson/30" },
  { name: "سيارات", icon: "🚗", count: "45K+", color: "from-purple-500/20 to-purple-600/20" },
  { name: "ورش صيانة", icon: "🔨", count: "12K+", color: "from-azure/20 to-azure/30" },
];

export function Categories() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-azure/5 rounded-full blur-3xl" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"><span className="gradient-text">تصفح الفئات</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">اكتشف ملايين القطع والخدمات في مكان واحد</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div key={category.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -8 }} className="glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">{category.icon}</div>
                <h3 className="font-bold text-base mb-2 text-white group-hover:text-gold transition-colors">{category.name}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{category.count}</p>
                <div className="mt-4 flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">تصفح</span>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
