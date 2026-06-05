import React, { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Appliance3DBackground from "./components/canvas/Appliance3DBackground";
import HeroSection from "./components/sections/HeroSection";
import ServicesSection from "./components/sections/ServicesSection";
import WhyChooseUsSection from "./components/sections/WhyChooseUsSection";
import ServiceProcessSection from "./components/sections/ServiceProcessSection";
import StatsSection from "./components/sections/StatsSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import ContactSection from "./components/sections/ContactSection";
import { FiArrowUp } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-sky-500 selection:text-white overflow-x-hidden font-sans">
      {/* 3D Background scene canvas */}
      <Appliance3DBackground hoveredIndex={hoveredIndex} />

      {/* Header Layout */}
      <Navbar />

      {/* Page Content layout */}
      <main className="relative w-full z-10">
        <HeroSection />
        
        <ServicesSection setHoveredIndex={setHoveredIndex} />
        
        <WhyChooseUsSection />
        
        <ServiceProcessSection />
        
        <StatsSection />
        
        <TestimonialsSection />
        
        <ContactSection />
      </main>

      {/* Footer Layout */}
      <Footer />

      {/* Scroll to top floating button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-sky-550/90 hover:bg-sky-500 text-white rounded-full border border-sky-400/20 shadow-lg shadow-sky-500/20 flex items-center justify-center cursor-pointer transform hover:-translate-y-1 transition-all duration-200 focus:outline-none"
            aria-label="Scroll to top"
            id="btn-scroll-to-top"
          >
            <FiArrowUp className="w-5 h-5 font-bold" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
