"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "أحمد العتيبي", role: "صاحب ورشة", content: "منصة بسكور غيّرت طريقة عملي تماماً. أصبح إيجاد قطع الغيار أسهل وأسرع.", rating: 5, avatar: "👨‍" },
  { name: "محمد القحطاني", role: "عميل", content: "خدمة SOS أنقذتني في منتصف الليل. استجابة سريعة واحترافية عالية.", rating: 5, avatar: "🚗" },
  { name: "فهد الدوسري", role: "تاجر قطع غيار", content: "مبيعاتي زادت 300% بعد الانضمام لبسكور. منصة احترافية ودعم ممتاز.", rating: 5, avatar: "🏭" },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900/50" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"><span className="gradient-text">ماذا يقول عملاؤنا</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">آلاف العملاء يثقون في BASQOR يومياً</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="glass rounded-2xl p-8 card-hover relative">
              <Quote className="absolute top-6 left-6 w-8 h-8 text-gold/20" />
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
              </div>
              <p className="text-gray-300 leading-relaxed">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
