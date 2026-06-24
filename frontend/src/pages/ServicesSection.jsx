import React from "react";
import {
  FiWind,
  FiCloudSnow,
  FiRefreshCw,
  FiDroplet,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Air Conditioner Repair",
    description:
      "Keep your home cool with professional split/window AC installation, deep jet cleaning, cooling fixing, and gas charging.",
    icon: FiWind,
    features: [
      "Deep Coil & Filter Jet Washing",
      "Gas Leakage Detection & Top-up",
      "Compressor Diagnostics & Fixes",
      "Thermostat & Fan Motor Service",
      "Window & Split AC Installation",
    ],
    priceStart: "₹499",
  },
  {
    title: "Refrigerator Repair",
    description:
      "Fast diagnostics and repair for single door, double door, and high-end side-by-side refrigerators.",
    icon: FiCloudSnow,
    features: [
      "Cooling Loss Repair & Tuning",
      "Compressor Inspection & Repair",
      "Thermostat & Defrost Issue Fixes",
      "Gas Charging & Leak Resolving",
      "Door Gasket Replacement",
    ],
    priceStart: "₹399",
  },
  {
    title: "Washing Machine Repair",
    description:
      "Reliable troubleshooting for top-load, front-load, automatic, and semi-automatic washing machines.",
    icon: FiRefreshCw,
    features: [
      "Drum & Bearing Adjustments",
      "Inlet/Drain Valve Replacement",
      "PCB / Motherboard Diagnostics",
      "Motor & Belt Repair/Replacement",
      "Error Code Clearings",
    ],
    priceStart: "₹500",
  },
  {
    title: "RO Water Purifier Repair",
    description:
      "Healthy drinking water with timely carbon/sediment membrane filter cleaning and TDS balancing.",
    icon: FiDroplet,
    features: [
      "Sediment & Carbon Filter Change",
      "High-Flow RO Membrane Replacement",
      "Booster Pump Diagnostics & Repair",
      "Water Taste Tuning (TDS Balance)",
      "Deep Servicing & Sanitization",
    ],
    priceStart: "₹199",
  },
];

const ServicesSection = () => {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6"
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-secondary-yellow mb-3 bg-secondary-yellow/10 px-4 py-1.5 rounded-full border border-secondary-yellow/20">
          Our Expertise
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          Professional Services for{" "}
          <span className="text-gradient">Your Comfort</span>
        </h2>
        <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
          We offer high-quality diagnostics, repair, and regular maintenance for
          all essential home cooling and cleaning appliances.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              onClick={handleScrollToContact}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="premium-card p-8 flex flex-col justify-between h-full relative overflow-hidden group cursor-pointer"
            >
              {/* Top accent highlight */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary-yellow to-secondary-yellow-dark opacity-50 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Icon & Starting price */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-maroon to-primary-maroon-dark flex items-center justify-center text-white shadow-lg shadow-black/20">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold text-secondary-yellow bg-secondary-yellow/10 border border-secondary-yellow/20 px-3 py-1.5 rounded-full uppercase tracking-widest">
                    Starts @ {service.priceStart}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight mb-3 group-hover:text-secondary-yellow transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Bullet Features */}
                <ul className="space-y-3 border-t border-white/10 pt-5 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start text-sm text-white/70 font-medium"
                    >
                      <FiCheck className="text-secondary-yellow w-4 h-4 mt-0.5 mr-3 shrink-0 stroke-[2.5]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="flex items-center text-sm font-bold text-secondary-yellow mt-auto group-hover:translate-x-2 transition-transform">
                <span className="mr-2">Book Service Now</span>
                <FiChevronRight className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
