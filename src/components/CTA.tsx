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
          <h2 className="text-4xl sm:text-5xl lg:text-6
