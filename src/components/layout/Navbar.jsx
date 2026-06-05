import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Let's use react-icons/fi to avoid import errors.
import { FiMenu as MenuIcon, FiX as CloseIcon, FiPhoneCall } from "react-icons/fi";


const navItems = [
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-choose-us" },
  { name: "Process", href: "#process" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50 py-4 shadow-lg shadow-slate-950/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white group"
            onClick={(e) => handleScrollToSection(e, "#root")}
          >
            <img
              src="/logo.png"
              alt="V&V Services Logo"
              className="w-9 h-9 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <span>
              V&amp;V <span className="text-sky-400 group-hover:text-cyan-400 transition-colors">Services</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sky-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+916374009568"
              className="flex items-center gap-2 text-sm font-semibold text-sky-400 bg-sky-950/40 hover:bg-sky-950/70 border border-sky-800/40 px-4 py-2 rounded-full transition-all duration-200"
            >
              <FiPhoneCall className="w-4 h-4" />
              <span>+91 63740 09568</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-200"
            >
              Book Service
            </a>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-sky-400 transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[68px] z-40 md:hidden bg-slate-950 border-t border-slate-900 px-6 py-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className="text-lg font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-900"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8 pb-16">
              <a
                href="tel:+916374009568"
                className="flex items-center justify-center gap-3 text-base font-semibold text-sky-400 bg-sky-950/40 border border-sky-850 px-4 py-3 rounded-2xl"
              >
                <FiPhoneCall className="w-5 h-5" />
                <span>Call +91 63740 09568</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollToSection(e, "#contact")}
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white text-center font-semibold px-4 py-3 rounded-2xl shadow-lg shadow-sky-500/10"
              >
                Book a Service
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
