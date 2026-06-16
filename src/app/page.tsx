"use client";

import { motion } from "framer-motion";
import { Search, Shield, Zap, Truck, Star, TrendingUp, Award, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-amber-400 text-sm font-medium">
                المنصة الرائدة في السعودية 🇸🇦
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              <span className="gradient-text">كل قطعة.</span>
              <br />
              <span className="text-white">كل مكان.</span>
              <br />
              <span className="text-amber-400">بثقة.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              منصة BASQOR المتكاملة لقطع الغيار والسيارات في المملكة العربية السعودية
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="glass rounded-2xl p-2 flex gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن قطعة غيار، سيارة، أو ورشة..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-right"
                  />
                </div>
                <button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-dark-950 font-bold py-3 px-8 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
                  بحث
                </button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto mb-12"
            >
              <StatCard icon={TrendingUp} value="2.4M+" label="قطعة غيار" />
              <StatCard icon={Award} value="18K+" label="تاجر موثوق" />
              <StatCard icon={Clock} value="98%" label="تسليم في الوقت" />
              <StatCard icon={Shield} value="24/7" label="دعم SOS" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-dark-950 font-bold py-4 px-10 rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
                ابدأ التسوق الآن
              </button>
              <button className="glass border-2 border-amber-500/50 text-amber-400 font-semibold py-4 px-10 rounded-xl hover:bg-amber-500/10 transition-all duration-300">
                سجل ورشتك
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">لماذا BASQOR؟</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              منصة متكاملة مصممة خصيصاً للسوق السعودي
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="تجار موثوقون"
              description="جميع التجار معتمدون وموثقون مع نظام تقييم شفاف"
              color="amber"
            />
            <FeatureCard
              icon={Zap}
              title="توصيل سريع"
              description="شحن خلال 24 ساعة مع تتبع مباشر للطلبات"
              color="emerald"
            />
            <FeatureCard
              icon={Truck}
              title="SOS على الطريق"
              description="مساعدة فورية على مدار الساعة في أي مكان"
              color="crimson"
            />
            <FeatureCard
              icon={Star}
              title="تقييمات حقيقية"
              description="مراجعات من عملاء حقيقيين مع صور"
              color="azure"
            />
            <FeatureCard
              icon={Search}
              title="بحث ذكي"
              description="ابحث بالـ VIN أو رقم القطعة أو الوصف"
              color="purple"
            />
            <FeatureCard
              icon={Award}
              title="ضمان الجودة"
              description="جميع القطع مفحوصة ومضمونة"
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="gradient-text">تصفح الفئات</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 cursor-pointer card-hover group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-bold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-400">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 BASQOR | بسكور - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: any) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 mb-3">
        <Icon className="w-6 h-6 text-amber-400" />
      </div>
      <div className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: any) {
  const colorClasses: any = {
    amber: "bg-amber-500/10 text-amber-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    crimson: "bg-crimson/10 text-crimson",
    azure: "bg-azure/10 text-azure",
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <motion.div whileHover={{ y: -5 }} className="glass rounded-2xl p-6 card-hover">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${colorClasses[color]}`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

const categories = [
  { name: "قطع أصلية", icon: "🏭", count: "850K+" },
  { name: "قطع بديلة", icon: "⚙️", count: "620K+" },
  { name: "مستعملة", icon: "🔄", count: "340K+" },
  { name: "تشاليح", icon: "🔧", count: "180K+" },
  { name: "سيارات", icon: "🚗", count: "45K+" },
  { name: "ورش", icon: "🔨", count: "12K+" },
];
