"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Shield, 
  Zap, 
  Truck, 
  MessageCircle, 
  MapPin, 
  Phone, 
  ChevronLeft,
  Star,
  TrendingUp,
  Clock,
  Award
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-primary-400 text-sm font-medium">
                المنصة الرائدة في السعودية 🇸🇦
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              <span className="gradient-text">كل قطعة.</span>
              <br />
              <span className="text-white">كل مكان.</span>
              <br />
              <span className="text-primary-400">بثقة.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
            >
              منصة BASQOR المتكاملة لقطع الغيار والسيارات في المملكة العربية السعودية
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <div className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="ابحث عن قطعة غيار، سيارة، أو ورشة..."
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-right"
                  />
                </div>
                <button className="btn-primary flex items-center justify-center gap-2 px-8 py-3">
                  <span>بحث</span>
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto"
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
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <button className="btn-primary btn-glow">
                ابدأ التسوق الآن
              </button>
              <button className="btn-secondary">
                سجل ورشتك
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary-500 rounded-full"
            />
          </div>
        </motion.div>
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
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              منصة متكاملة مصممة خصيصاً للسوق السعودي
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="تجار موثوقون"
              description="جميع التجار معتمدون وموثقون مع نظام تقييم شفاف"
              color="accent-gold"
            />
            <FeatureCard
              icon={Zap}
              title="توصيل سريع"
              description="شحن خلال 24 ساعة مع تتبع مباشر للطلبات"
              color="accent-emerald"
            />
            <FeatureCard
              icon={Truck}
              title="SOS على الطريق"
              description="مساعدة فورية على مدار الساعة في أي مكان"
              color="accent-crimson"
            />
            <FeatureCard
              icon={MessageCircle}
              title="دردشة مباشرة"
              description="تواصل فوري مع التجار والورش"
              color="accent-azure"
            />
            <FeatureCard
              icon={MapPin}
              title="أقرب الورش"
              description="اعثر على أفضل الورش بالقرب منك"
              color="primary-500"
            />
            <FeatureCard
              icon={Phone}
              title="دعم 24/7"
              description="فريق دعم جاهز لمساعدتك في أي وقت"
              color="purple-500"
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
                className="card cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-bold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Components
function StatCard({ icon: Icon, value, label }: { icon: any, value: string, label: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/10 mb-3">
        <Icon className="w-6 h-6 text-primary-400" />
      </div>
      <div className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card group"
    >
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-${color}/10 mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-7 h-7 text-${color}`} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

const categories = [
  { name: "قطع غيار أصلية", icon: "🏭", count: "850K+" },
  { name: "قطع بديلة", icon: "⚙️", count: "620K+" },
  { name: "مستعملة", icon: "🔄", count: "340K+" },
  { name: "تشاليح", icon: "🔧", count: "180K+" },
  { name: "سيارات كاملة", icon: "🚗", count: "45K+" },
  { name: "ورش صيانة", icon: "🔨", count: "12K+" },
];
