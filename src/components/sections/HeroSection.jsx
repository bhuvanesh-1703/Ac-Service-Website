import React from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiCalendar, FiCheckCircle, FiShield, FiStar } from "react-icons/fi";

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
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 bg-bg-ivory overflow-hidden">
      
      {/* Decorative background grid and soft gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(#EBE6D8_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-secondary-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Text & Actions */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-maroon/5 border border-primary-maroon/15 text-primary-maroon text-xs font-bold uppercase tracking-wider mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-maroon animate-pulse" />
            Home Appliance Repair Experts
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-dark tracking-tight leading-[1.1] mb-6"
          >
            Professional Home Appliance Service at{" "}
            <span className="text-primary-maroon block mt-1">Your Doorstep</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-text-dark/75 font-light leading-relaxed max-w-2xl mb-8"
          >
            Get verified HVAC engineers for split/window AC, refrigerator, washing machine, and RO water filter repairs. Backed by transparent upfront estimates and our 90-Day Warranty.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="flex items-center justify-center gap-2.5 bg-primary-maroon hover:bg-primary-maroon-dark text-white font-bold text-sm uppercase tracking-wider px-8 py-4.5 rounded-xl shadow-lg shadow-primary-maroon/10 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <FiCalendar className="w-4 h-4 stroke-[2.5]" />
              <span>Book Appointment</span>
            </a>
            <a
              href="tel:+916374009568"
              className="flex items-center justify-center gap-2.5 bg-white hover:bg-bg-ivory text-text-dark border border-border-subtle hover:border-primary-maroon/20 font-bold text-sm uppercase tracking-wider px-8 py-4.5 rounded-xl transition-all duration-200"
            >
              <FiPhoneCall className="w-4 h-4 text-primary-maroon" />
              <span>Call +91 63740 09568</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Premium 2D Graphics and Badges */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          
          {/* Main Visual Frame (Card Stack Mockup) */}
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
            
            {/* Base Card - Service Check */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -top-4 left-6 bg-white border border-border-subtle p-5 rounded-2xl shadow-xl shadow-primary-maroon/3 max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary-yellow text-primary-maroon flex items-center justify-center text-sm font-bold shadow-inner">
                  <FiCheckCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-text-dark">Quick Dispatch</h4>
                  <p className="text-[9px] text-text-dark/50 mt-0.5">2 - 4 hrs ETA</p>
                </div>
              </div>
            </motion.div>

            {/* Middle Card - Quality Guarantee */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="absolute bottom-6 -right-6 bg-white border border-border-subtle p-5 rounded-2xl shadow-xl shadow-primary-maroon/3 max-w-[220px] z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-maroon text-white flex items-center justify-center text-sm font-bold shadow-md">
                  <FiShield className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-text-dark">Service Warranty</h4>
                  <p className="text-[9px] text-text-dark/50 mt-0.5">90-Day cover guaranteed</p>
                </div>
              </div>
            </motion.div>

            {/* Central Graphic Mock - Rating and Engineers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white border border-border-subtle p-7 rounded-2xl shadow-2xl shadow-primary-maroon/5 w-64 text-center z-0"
            >
              <div className="flex justify-center gap-0.5 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="fill-amber-500 w-4 h-4" />
                ))}
              </div>
              <h3 className="text-lg font-black text-text-dark tracking-tight">4.9 / 5.0 Rating</h3>
              <p className="text-xs text-text-dark/50 font-light mt-1 max-w-[180px] mx-auto leading-relaxed">
                Reviewed by over 5,000+ local Rajapalayam homeowners.
              </p>
              
              <div className="mt-5 border-t border-border-subtle/70 pt-4 flex justify-center -space-x-2.5">
                {["R", "S", "M", "K"].map((val, idx) => (
                  <div 
                    key={idx} 
                    className="w-7 h-7 rounded-full border-2 border-white bg-secondary-yellow text-primary-maroon font-bold text-[10px] flex items-center justify-center"
                  >
                    {val}
                  </div>
                ))}
                <div className="w-7 h-7 rounded-full border-2 border-white bg-primary-maroon text-white font-bold text-[9px] flex items-center justify-center tracking-tight">
                  +12
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
