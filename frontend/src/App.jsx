import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import JoinTeam from "./components/pages/JoinTeam";
import AiChat from "./components/chat/AiChat";
import { FiArrowUp } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

function App() {
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
    <BrowserRouter>
      <div className="relative min-h-screen bg-bg-ivory text-text-dark selection:bg-primary-maroon selection:text-white overflow-x-hidden font-sans">
        
        {/* 1. Header Navigation */}
        <Navbar />

        {/* 2. Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join-our-team" element={<JoinTeam />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* 3. Footer Layout */}
        <Footer />

        {/* 4. Scroll to top floating button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-24 right-7 z-50 w-12 h-12 bg-primary-maroon hover:bg-primary-maroon-dark text-white rounded-full border border-primary-maroon-dark/20 shadow-xl flex items-center justify-center cursor-pointer transform hover:-translate-y-1 transition-all duration-200 focus:outline-none"
              aria-label="Scroll to top"
              id="btn-scroll-to-top"
            >
              <FiArrowUp className="w-5 h-5 font-extrabold text-secondary-yellow" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* 5. WhatsApp AI Chatbot Widget */}
        <AiChat />
      </div>
    </BrowserRouter>
  );
}

export default App;
