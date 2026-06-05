import React from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400 relative overflow-hidden">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute -top-40 left-1/3 w-96 h-96 bg-sky-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand & About */}
        <div className="flex flex-col gap-4">
          <a
            href="#"
            className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white group"
            onClick={handleScrollToTop}
          >
            <img
              src="/logo.png"
              alt="V&V Services Logo"
              className="w-9 h-9 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <span>
              V&amp;V <span className="text-sky-400">Services</span>
            </span>
          </a>
          <p className="text-sm font-light leading-relaxed text-slate-400 mt-2">
            V&amp;V Services is your trusted home appliance repair and maintenance partner. We deliver fast, same-day, high-quality, and affordable repairs for all your essential home devices.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-400 transition-colors" aria-label="Facebook">
              <FiFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-400 transition-colors" aria-label="Instagram">
              <FiInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-400 transition-colors" aria-label="Twitter">
              <FiTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Our Services */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Our Services</h3>
          <ul className="space-y-3 text-sm font-light">
            <li>
              <a href="#services" onClick={(e) => handleScrollToSection(e, "#services")} className="hover:text-white transition-colors">
                Air Conditioner Repair &amp; Service
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleScrollToSection(e, "#services")} className="hover:text-white transition-colors">
                Refrigerator Repair &amp; Service
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleScrollToSection(e, "#services")} className="hover:text-white transition-colors">
                Washing Machine Repair &amp; Service
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleScrollToSection(e, "#services")} className="hover:text-white transition-colors">
                RO Water Purifier Repair &amp; Service
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Contact Info</h3>
          <ul className="space-y-4 text-sm font-light">
            <li className="flex items-start gap-3">
              <FiPhone className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
              <a href="tel:+916374009568" className="hover:text-white transition-colors">
                +91 63740 09568
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
              <a href="mailto:info@vvservices.com" className="hover:text-white transition-colors">
                info@vvservices.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
              <span>Duraisamy Puram, Rajapalayam-626117, Tamil Nadu.</span>
            </li>
            <li className="flex items-start gap-3">
              <FiClock className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
              <span>Mon - Sun: 8:00 AM - 9:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Newsletter</h3>
          <p className="text-sm font-light leading-relaxed mb-4">
            Subscribe to our newsletter for seasonal maintenance tips and discount offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full p-1.5 focus-within:border-sky-500/50 transition-colors"
          >
            <FiMail className="w-4 h-4 text-slate-500 ml-3 shrink-0" />
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border-none outline-none text-white text-xs w-full py-1 pr-2 placeholder-slate-600 focus:ring-0"
              required
            />
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light">
        <p>&copy; {new Date().getFullYear()} V&amp;V Services. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors" onClick={handleScrollToTop}>
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
