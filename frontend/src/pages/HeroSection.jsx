import React from "react";
import { motion } from "framer-motion";
import {
  FiPhoneCall,
  FiArrowRight,
  FiShield,
  FiStar,
  FiClock
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#050505]">
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

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Typography & CTAs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start text-left pt-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-maroon/20 border border-primary-maroon/50 text-secondary-yellow text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-yellow"></span>
            </span>
            Available For Dispatch
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Appliance Repair, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-yellow via-[#E2C792] to-white drop-shadow-lg">
              Reimagined.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-white/70 font-light max-w-lg mb-10 leading-relaxed">
            Experience lightning-fast, verified expert service for your AC, refrigerators, and water purifiers. Complete transparency, zero hidden costs, and a rock-solid 90-day warranty.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-secondary-yellow text-black rounded-2xl font-bold text-sm uppercase tracking-wide transition-all hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(199,167,108,0.4)]"
            >
              Book Now <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+916374009568"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 transition-colors font-medium text-sm uppercase tracking-wide"
            >
              <FiPhoneCall className="w-5 h-5 text-white/70" />
              +91 63740 09568
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Modern Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center mt-10 lg:mt-0"
        >
          {/* Main Image Card */}
          <motion.div variants={fadeUp} className="absolute inset-0 right-0 lg:right-10 top-10 bottom-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl z-10 group">
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent z-10" />
             <img src="/ac_service_hero.png" alt="Expert AC Repair" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             
             {/* Bottom Overlay Info on Main Image */}
             <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex justify-between items-end">
               <div>
                 <h3 className="text-white font-bold text-xl mb-1">Expert Technicians</h3>
                 <p className="text-white/60 text-sm">Background-checked & certified</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                 <FiShield className="text-secondary-yellow w-6 h-6" />
               </div>
             </div>
          </motion.div>

          {/* Floating Bento Card 1: Rating */}
          <motion.div 
            variants={fadeUp} 
            className="absolute top-4 -left-4 lg:-left-8 bg-[#0A0A0A]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20 flex items-center gap-4"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          >
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary-maroon flex items-center justify-center border-2 border-[#0A0A0A] text-white font-bold text-xs">AC</div>
              <div className="w-10 h-10 rounded-full bg-secondary-yellow flex items-center justify-center border-2 border-[#0A0A0A] text-black font-bold text-xs">RO</div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-[#0A0A0A] text-white text-xs">5k+</div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[1,2,3,4,5].map(i => <FiStar key={i} className="fill-secondary-yellow text-secondary-yellow w-3 h-3" />)}
              </div>
              <p className="text-white text-xs font-semibold tracking-wide">4.9/5 Rating</p>
            </div>
          </motion.div>

          {/* Floating Bento Card 2: Speed */}
          <motion.div 
            variants={fadeUp} 
            className="absolute bottom-1/3 -right-4 lg:-right-4 bg-[#0A0A0A]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20"
            style={{ animation: 'float 7s ease-in-out infinite reverse' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center border border-green-500/30 shadow-inner">
                <FiClock className="text-green-400 w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Lightning Fast</h4>
                <p className="text-white/50 text-xs mt-0.5">Under 2 hour arrival</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}} />
    </section>
  );
};

export default HeroSection;
