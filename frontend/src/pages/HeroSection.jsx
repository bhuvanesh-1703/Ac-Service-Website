import React from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiArrowRight, FiShield, FiSettings } from "react-icons/fi";
import SideRays from "../components/SideRays";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-transparent flex items-center justify-center pt-24 pb-12 overflow-hidden">
      
      {/* Ultra Subtle Atmospheric Background */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
        <SideRays speed={1.5} rayColor1="#C7A76C" rayColor2="#800000" intensity={1.2} origin="top-right" spread={3} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: Ultra-Clean Minimalist Typography */}
        <div className="flex flex-col items-start z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <FiSettings className="text-secondary-yellow w-4 h-4 animate-[spin_4s_linear_infinite]" />
            <span className="text-white/80 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">Precision Engineering</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-[5.5rem] font-black text-white tracking-tighter leading-[1.05] mb-6"
          >
            Perfect <br /> Cooling. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-yellow via-[#E2C792] to-white">
              Guaranteed.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/50 font-light max-w-md mb-10 leading-relaxed"
          >
            We bring expert, transparent, and ultra-fast appliance repair directly to your doorstep. Backed by a flawless 90-day warranty.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#contact" className="group flex items-center justify-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:bg-secondary-yellow hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Book Service <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+916374009568" className="flex items-center justify-center gap-3 px-10 py-4 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
              <FiPhoneCall className="w-4 h-4 text-secondary-yellow" /> Call Now
            </a>
          </motion.div>
        </div>

        {/* Right: High-Tech Orbital Rings Design */}
        <div className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center z-10 mt-16 lg:mt-0">
          
          {/* Rotating Orbital Rings */}
          <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[1.5px] border-white/10 border-dashed"
          />
          <motion.div 
            animate={{ rotate: -360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 rounded-full border border-secondary-yellow/20"
          />
          <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-16 rounded-full border-[2px] border-white/5 border-dotted"
          />

          {/* Central Circular Image Mask */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-24 rounded-full overflow-hidden border-[6px] border-bg-ivory shadow-[0_0_100px_rgba(199,167,108,0.15)] bg-black z-20 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img src="/ac_service_hero.png" alt="AC Technician" className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[15s] opacity-90" />
            
            <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center z-20">
               <div className="w-12 h-12 rounded-full bg-secondary-yellow/20 backdrop-blur-md flex items-center justify-center border border-secondary-yellow/50 mb-3">
                 <FiShield className="text-secondary-yellow w-5 h-5" />
               </div>
               <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">Certified</span>
            </div>
          </motion.div>

          {/* Floating Badges on the Orbit */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: "spring" }}
            className="absolute top-12 right-10 lg:right-4 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">Fast Response</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: "spring" }}
            className="absolute bottom-20 left-4 lg:-left-4 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl"
          >
            <span className="text-secondary-yellow font-black text-sm">⭐ 4.9</span>
            <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase border-l border-white/20 pl-3">Top Rated</span>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
