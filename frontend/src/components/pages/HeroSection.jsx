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

       
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 relative w-full flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border-subtle group">
            {/* Main Visual Image */}
            <img 
              src="/ac_service_hero.png" 
              alt="Professional AC Service Technician" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
          
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4.5 py-3 rounded-2xl shadow-xl border border-border-subtle/80 absolute bottom-6 right-6 z-10 max-w-[220px]"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shadow-inner">
                <FiShield className="w-5.5 h-5.5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-text-dark tracking-tight">Fast & Reliable</span>
                <span className="text-[10px] text-text-dark/65 font-bold mt-0.5 uppercase tracking-wider">AC Service</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
