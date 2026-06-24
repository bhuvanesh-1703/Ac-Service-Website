import React from "react";
import {
  FiPhoneCall,
  FiMapPin,
  FiClock,
  FiSettings,
  FiCheckCircle,
} from "react-icons/fi";

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050807] text-white border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Intro */}
        <div className="space-y-4">
          <a
            href="#"
            onClick={handleScrollToTop}
            className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white"
          >
            <img
              src="/logo.png"
              alt="V&V Services Logo"
              className="w-9 h-9 object-contain"
              style={{ mixBlendMode: "screen" }}
            />
            <span className="font-extrabold">
              V&amp;V <span className="text-secondary-yellow">Services</span>
            </span>
          </a>
          <p className="text-xs text-white/70 leading-relaxed font-light">
            Professional repair, cleaning, installation and maintenance
            solutions for split AC, window AC, refrigerators, washing machines,
            and RO systems at your doorstep.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-yellow/10 text-xs font-semibold text-secondary-yellow border border-secondary-yellow/20">
            <FiCheckCircle className="w-3.5 h-3.5" />
            <span>90-Day Warranty Backed</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-yellow mb-5">
            Quick navigation
          </h4>
          <ul className="space-y-3">
            {[
              "Services",
              "Why Choose Us",
              "Our Process",
              "Testimonials",
              "Book Appointment",
            ].map((name, idx) => {
              const hrefs = [
                "#services",
                "#why-choose-us",
                "#process",
                "#testimonials",
                "#contact",
              ];
              return (
                <li key={idx}>
                  <a
                    href={hrefs[idx]}
                    className="text-xs font-semibold text-white/80 hover:text-secondary-yellow transition-colors block uppercase tracking-wide"
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Service Hours */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-yellow mb-1">
            Office Slots
          </h4>
          <div className="flex items-start gap-3 text-xs text-white/80">
            <FiClock className="w-4 h-4 text-secondary-yellow mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Mon - Sun (All Days)</p>
              <p className="font-light text-white/60 mt-0.5">
                8:00 AM - 9:00 PM
              </p>
              <p className="font-semibold text-secondary-yellow mt-1">
                24/7 Emergency Support
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-xs text-white/80">
            <FiSettings className="w-4 h-4 text-secondary-yellow mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Service Zones</p>
              <p className="font-light text-white/60 mt-0.5">
                Duraisamy Puram, Rajapalayam, and nearby areas.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-yellow mb-1">
            Direct Helpdesk
          </h4>
          <div className="flex items-start gap-3 text-xs text-white/80">
            <FiPhoneCall className="w-4 h-4 text-secondary-yellow mt-0.5 shrink-0" />
            <div>
              <span className="font-light text-white/50 block">
                Emergency Helpline
              </span>
              <a
                href="tel:+916374009568"
                className="text-sm font-black hover:text-secondary-yellow transition-all mt-0.5 block text-white"
              >
                +91 63740 09568
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 text-xs text-white/80 mt-6">
            <FiMapPin className="w-4 h-4 text-secondary-yellow mt-0.5 shrink-0" />
            <div>
              <span className="font-light text-white/50 block">
                Office Address
              </span>
              <span className="font-light text-white/70 block mt-0.5">
                Duraisamy Puram, Rajapalayam-626117, Tamil Nadu, India.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/50 font-medium tracking-wide">
        <p>
          &copy; {new Date().getFullYear()} V&amp;V Services Rajapalayam. All
          Rights Reserved.
        </p>
        <p className="mt-2 md:mt-0">
          Certified Appliance Service &amp; HVAC Engineers.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
