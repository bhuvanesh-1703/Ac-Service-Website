import React from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiCalendar, FiChevronDown } from "react-icons/fi";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Subtle bottom fade to help overlay sections */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <motion.div
          className="lg:col-span-8 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/60 border border-sky-850 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Home Appliance Repair Experts
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
          >
            Professional Home Appliance Service at{" "}
            <span className="text-gradient-blue-cyan block mt-1">Your Doorstep</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-2xl mb-10"
          >
            Expert AC, Refrigerator, Washing Machine and RO Repair Services. Fast, reliable technicians delivering quality solutions on the same day.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="tel:+916374009568"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-sky-500/10 hover:shadow-sky-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FiPhoneCall className="w-5 h-5 animate-bounce" />
              <span>Call Now: +91 63740 09568</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 hover:border-slate-700 font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
            >
              <FiCalendar className="w-5 h-5 text-sky-400" />
              <span>Book Appointment</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Column 12 Indicator Space (allowing the user to see the 3D floating meshes on the right) */}
        <div className="lg:col-span-4 hidden lg:block" />
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={(e) => handleScrollToSection(e, "#services")}
      >
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Scroll Down</span>
        <FiChevronDown className="w-5 h-5 text-sky-400" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
