import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiPhoneCall, FiShield } from "react-icons/fi";


const navItems = [
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-choose-us" },
  { name: "Process", href: "#process" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Book Now", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  const isAdmin = !!localStorage.getItem("token");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-primary-maroon py-3.5 shadow-lg border-b border-primary-maroon-dark/30"
            : "bg-primary-maroon/95 py-5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 text-xl font-bold tracking-tight text-white group"
            onClick={(e) => handleScrollToSection(e, "#root")}
          >
            <img
              src="/logo.png"
              alt="V&V Services Logo"
              className="w-8.5 h-8.5 object-contain rounded-lg border border-white/10 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-extrabold">
              V&amp;V <span className="text-secondary-yellow group-hover:text-white transition-colors">Services</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="text-xs font-bold uppercase tracking-wider text-white/90 hover:text-secondary-yellow transition-colors relative group py-1.5"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary-yellow transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}

          { isAdmin? <Link to="/admin" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-yellow bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-xl border border-secondary-yellow/20 transition-all">
             <FiShield className="w-3.5 h-3.5" />
             Admin Dashboard
          </Link> :
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/join-our-team"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary-yellow bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-xl border border-secondary-yellow/20 transition-all"
            >
              <FiPhoneCall className="w-3.5 h-3.5" />
              <span>Join Our Team</span>
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="bg-secondary-yellow hover:bg-secondary-yellow-dark text-primary-maroon text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md shadow-black/10 transition-all cursor-pointer"
            >
              Book Service
            </a>
          </div>}

          {/* Hamburger Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-secondary-yellow transition-colors focus:outline-none cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] z-40 md:hidden bg-primary-maroon px-6 py-8 flex flex-col justify-between border-t border-primary-maroon-dark/20"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className="text-base font-bold text-white/95 hover:text-secondary-yellow transition-colors py-2 border-b border-primary-maroon-dark/30 uppercase tracking-wider"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-8 pb-16">
              {isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 text-sm font-bold text-secondary-yellow bg-white/10 border border-secondary-yellow/20 px-4 py-3.5 rounded-xl uppercase tracking-wider"
                >
                  <FiShield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/join-our-team"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 text-sm font-bold text-secondary-yellow bg-white/10 border border-secondary-yellow/20 px-4 py-3.5 rounded-xl uppercase tracking-wider"
                  >
                    <FiPhoneCall className="w-4 h-4" />
                    <span>Join Our Team</span>
                  </Link>
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollToSection(e, "#contact")}
                    className="bg-secondary-yellow text-primary-maroon text-center font-bold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-md shadow-black/10 cursor-pointer"
                  >
                    Book a Service
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
