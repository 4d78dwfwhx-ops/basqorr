"use client";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    "الشركة": ["من نحن", "فريق العمل", "الوظائف", "الصحافة"],
    "الخدمات": ["السوق", "الورش", "SOS", "Parts Hunter"],
    "الدعم": ["مركز المساعدة", "اتصل بنا", "الأسئلة الشائعة", "الشروط"],
    "قانوني": ["سياسة الخصوصية", "شروط الاستخدام", "سياسة الاسترجاع"],
  };
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-dark-950">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center glow-gold"><span className="text-dark-950 font-black text-2xl">ب</span></div>
              <div><h3 className="text-3xl font-black gradient-text">بسكور</h3><p className="text-xs text-gray-400">BASQOR</p></div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">منصة BASQOR المتكاملة لقطع الغيار والسيارات في المملكة العربية السعودية. كل قطعة. كل مكان. بثقة.</p>
            <div className="space-y-3 mb-6">
              <a href="mailto:info@basqor.sa" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors"><Mail className="w-4 h-4" /><span>info@basqor.sa</span></a>
              <a href="tel:+966500000000" className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors"><Phone className="w-4 h-4" /><span dir="ltr">+966 50 000 0000</span></a>
              <div className="flex items-center gap-3 text-gray-400"><MapPin className="w-4 h-4" /><span>الرياض، المملكة العربية السعودية</span></div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 transition-all duration-300"><social.icon className="w-5 h-5" /></a>
              ))}
            </div>
          </motion.div>
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: colIndex * 0.1 }}>
              <h4 className="text-lg font-bold text-white mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => <li key={link}><a href="#" className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm">{link}</a></li>)}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2026 BASQOR | بسكور - جميع الحقوق محفوظة</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">سياسة الخصوصية</a>
            <a href="#" className="text-gray-400 hover:text-gold text-sm transition-colors">الشروط والأحكام</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
