import React from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiArrowRight, FiShield, FiStar, FiCheck } from "react-icons/fi";
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
    <section className="relative min-h-screen bg-[#030303] flex items-center justify-center p-4 sm:p-8 pt-28 pb-12">
      
      {/* The Portal Window */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-[1400px] h-[80vh] min-h-[600px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/5 group"
      >
        
        {/* Animated Background Rays Inside Portal */}
        <div className="absolute inset-0 z-0 mix-blend-screen opacity-90">
          <SideRays
            speed={1.5}
            rayColor1="#C7A76C"
            rayColor2="#500000"
            intensity={2.5}
            spread={3}
            origin="bottom-right"
            tilt={15}
            saturation={2}
            blend={0.6}
            falloff={1.2}
            opacity={1}
          />
        </div>

        {/* Hero Image with Stylized Luminosity Blend */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20 z-10" />
          <img 
            src="/ac_service_hero.png" 
            alt="Premium AC Service" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105 group-hover:scale-110 transition-transform duration-[20s] ease-out" 
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 w-full h-full flex flex-col justify-center px-8 sm:px-16 md:px-24">
          <div className="max-w-3xl">
            
            {/* Elegant Line Indicator */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex items-center gap-6 mb-8"
            >
              <div className="h-[2px] w-16 bg-secondary-yellow shadow-[0_0_10px_#C7A76C]" />
              <span className="text-secondary-yellow font-bold uppercase tracking-[0.4em] text-xs sm:text-sm">
                Elite Appliance Care
              </span>
            </motion.div>
            
            {/* Editorial Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[1.05] mb-8"
            >
              Masterful <br />
              Repairs, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-yellow to-[#fdf0d5] italic font-serif font-medium drop-shadow-xl">
                Delivered.
              </span>
            </motion.h1>
            
            {/* Minimalist Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-white/60 text-lg sm:text-xl font-light mb-12 leading-relaxed border-l-[3px] border-secondary-yellow/40 pl-8 max-w-2xl"
            >
              Experience a new standard of home comfort. Certified technicians, transparent diagnostics, and unparalleled precision.
            </motion.p>
            
            {/* Ultra-Clean CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <a 
                href="#contact"
                onClick={(e) => handleScrollToSection(e, "#contact")}
                className="group relative px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm overflow-hidden flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request Service <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a 
                href="tel:+916374009568"
                className="px-10 py-5 rounded-full border border-white/30 text-white font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
              >
                <FiPhoneCall className="w-4 h-4" /> 
                +91 63740 09568
              </a>
            </motion.div>
            
          </div>
        </div>

        {/* Floating Accent Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
          className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-30 flex flex-col items-center"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] group hover:scale-110 transition-transform cursor-default">
            <FiShield className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-yellow mb-2 drop-shadow-[0_0_10px_rgba(199,167,108,0.8)]" />
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <FiStar key={i} className="w-2 h-2 sm:w-3 sm:h-3 fill-secondary-yellow text-secondary-yellow" />)}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
