import React from "react";
import { motion } from "framer-motion";
import {
  FiPhoneCall,
  FiCalendar,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import SideRays from "../components/SideRays";

const HeroSection = () => {
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* Immersive SideRays Background */}
      <div className="absolute inset-0 z-0">
        <SideRays
          speed={2.0}
          rayColor1="#C7A76C"
          rayColor2="#800000"
          intensity={2}
          spread={2.5}
          origin="top-left"
          tilt={-10}
          saturation={1.5}
          blend={0.5}
          falloff={1.6}
          opacity={0.8}
        />
      </div>

      {/* Radial Glow for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-maroon/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        {/* Premium Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-xl"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-yellow"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-white/90 uppercase">
            Premium Appliance Care
          </span>
        </motion.div>

        {/* Massive Gradient Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8"
        >
          Flawless Service. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-secondary-yellow drop-shadow-2xl">
            Ultimate Comfort.
          </span>
        </motion.h1>

        {/* Sophisticated Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-base sm:text-xl text-white/60 font-light max-w-3xl mb-12 leading-relaxed"
        >
          Expert repairs for your AC, refrigerator, and home appliances. Backed
          by verified engineers, transparent upfront pricing, and our signature
          90-day warranty.
        </motion.p>

        {/* Sleek Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto z-20 relative"
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollToSection(e, "#contact")}
            className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden transition-transform hover:scale-105 shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Service{" "}
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="tel:+916374009568"
            className="flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 transition-colors font-medium text-sm uppercase tracking-widest shadow-xl"
          >
            <FiPhoneCall className="w-4 h-4 text-secondary-yellow" />
            Call +91 63740 09568
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 mt-16 pt-10 border-t border-white/10 w-full max-w-4xl"
        >
          {[
            { icon: FiShield, text: "90-Day Warranty" },
            { icon: FiCheckCircle, text: "Verified Engineers" },
            { icon: FiCalendar, text: "Same-Day Service" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-white/70">
              <item.icon className="w-5 h-5 text-secondary-yellow" />
              <span className="text-sm font-semibold tracking-wider uppercase">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Cinematic Hero Image / Mockup below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="relative mt-20 w-full max-w-6xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
        >
          {/* Fade gradient at bottom for smooth blending into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
          <img
            src="/ac_service_hero.png"
            alt="AC Technician at Work"
            className="w-full h-auto aspect-[21/9] object-cover opacity-70"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
