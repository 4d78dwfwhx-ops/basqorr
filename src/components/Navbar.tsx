"use client";
import { motion } from "framer-motion";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "الرئيسية", href: "#" },
    { name: "السوق", href: "#marketplace" },
    { name: "الورش", href: "#workshops" },
    { name: "SOS", href: "#sos" },
    { name: "المساعدة", href: "#help" },
  ];

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="fixed top-0 right-0 left-0 z-50 glass-strong">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center glow-gold">
              <span className="text-dark-950 font-black text-xl">ب</span>
            </div>
            <div>
              <h1 className="text-2xl font-black gradient-text">بسكور</h1>
              <p className="text-xs text-gray-400 -mt-1">BASQOR</p>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-gold font-medium transition-colors duration-300 relative group">
                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2.5 rounded-xl glass hover:bg-gold/10 transition-all group">
              <Search className="w-5 h-5 text-gray-300 group-hover:text-gold transition-colors" />
            </button>
            <button className="p-2.5 rounded-xl glass hover:bg-gold/10 transition-all group relative">
              <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-gold transition-colors" />
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-crimson rounded-full text-xs flex items-center justify-center font-bold">0</span>
            </button>
            <button className="btn-primary py-2.5 px-6 rounded-xl text-sm">تسجيل الدخول</button>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2.5 rounded-xl glass">
            {isOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5 text-gold" />}
          </button>
        </div>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-300 hover:text-gold font-medium py-2 px-4 rounded-xl hover:bg-gold/10 transition-all" onClick={() => setIsOpen(false)}>{link.name}</a>
              ))}
              <button className="btn-primary py-3 px-6 rounded-xl mt-2">تسجيل الدخول</button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
