import React from "react";
import { motion } from "framer-motion";
import {
  FiPhoneCall,
  FiCalendar,
  FiCheckCircle,
  FiShield,
  FiStar,
} from "react-icons/fi";
import AnimatedBackground from "./AnimatedBackground";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Animated SaaS Background */}
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Text & Actions */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left glass-card p-8 md:p-12 glow-effect relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-secondary-yellow text-xs font-bold uppercase tracking-wider mb-8 shadow-lg shadow-black/20"
          >
            <span className="w-2 h-2 rounded-full bg-secondary-yellow animate-pulse shadow-[0_0_8px_rgba(199,167,108,0.8)]" />
            Home Appliance Repair Experts
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6"
          >
            Professional Home Appliance Service at{" "}
            <span className="text-gradient-doorstep block mt-2 drop-shadow-md">
              Your Doorstep
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-dark/75 font-light leading-relaxed max-w-2xl mb-8"
          >
            Get verified HVAC engineers for split/window AC, refrigerator,
            washing machine, and RO water filter repairs. Backed by transparent
            upfront estimates and our 90-Day Warranty.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto mt-2"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="btn-premium flex items-center justify-center gap-2.5 px-8 py-4.5 text-sm uppercase tracking-wider cursor-pointer"
            >
              <FiCalendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </a>
            <a
              href="tel:+916374009568"
              className="flex items-center justify-center gap-2.5 border border-white/10 hover:bg-white/5 text-white/80 font-semibold text-sm uppercase tracking-wider px-8 py-4.5 rounded-xl transition-all duration-300 backdrop-blur-md"
            >
              <FiPhoneCall className="w-5 h-5 text-white/60" />
              <span>Call +91 63740 09568</span>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10 w-full"
          >
            <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
              <FiCheckCircle className="text-secondary-yellow w-5 h-5" />
              <span>Certified Experts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
              <FiShield className="text-secondary-yellow w-5 h-5" />
              <span>90-Day Warranty</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: [-5, 5, -5] }}
          transition={{ 
            opacity: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" },
            y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.8 }
          }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border-subtle">
            {/* Main Visual Image */}
            <img
              src="/ac_service_hero.png"
              alt="Professional AC Service Technician"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
