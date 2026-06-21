import React from "react";
import { FiWind, FiCloudSnow, FiRefreshCw, FiDroplet, FiCheck, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Air Conditioner Repair",
    description: "Keep your home cool with professional split/window AC installation, deep jet cleaning, cooling fixing, and gas charging.",
    icon: FiWind,
    features: [
      "Deep Coil & Filter Jet Washing",
      "Gas Leakage Detection & Top-up",
      "Compressor Diagnostics & Fixes",
      "Thermostat & Fan Motor Service",
      "Window & Split AC Installation"
    ],
    priceStart: "₹499",
  },
  {
    title: "Refrigerator Repair",
    description: "Fast diagnostics and repair for single door, double door, and high-end side-by-side refrigerators.",
    icon: FiCloudSnow,
    features: [
      "Cooling Loss Repair & Tuning",
      "Compressor Inspection & Repair",
      "Thermostat & Defrost Issue Fixes",
      "Gas Charging & Leak Resolving",
      "Door Gasket Replacement"
    ],
    priceStart: "₹399",
  },
  {
    title: "Washing Machine Repair",
    description: "Reliable troubleshooting for top-load, front-load, automatic, and semi-automatic washing machines.",
    icon: FiRefreshCw,
    features: [
      "Drum & Bearing Adjustments",
      "Inlet/Drain Valve Replacement",
      "PCB / Motherboard Diagnostics",
      "Motor & Belt Repair/Replacement",
      "Error Code Clearings"
    ],
    priceStart: "₹500",
  },
  {
    title: "RO Water Purifier Repair",
    description: "Healthy drinking water with timely carbon/sediment membrane filter cleaning and TDS balancing.",
    icon: FiDroplet,
    features: [
      "Sediment & Carbon Filter Change",
      "High-Flow RO Membrane Replacement",
      "Booster Pump Diagnostics & Repair",
      "Water Taste Tuning (TDS Balance)",
      "Deep Servicing & Sanitization"
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
    <section id="services" className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-3 bg-primary-maroon/5 px-3 py-1 rounded-full border border-primary-maroon/10">
          Our Expertise
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark mb-4">
          Professional Services for <span className="text-primary-maroon">Your Comfort</span>
        </h2>
        <p className="text-sm sm:text-base text-text-dark/60 font-light leading-relaxed">
          We offer high-quality diagnostics, repair, and regular maintenance for all essential home cooling and cleaning appliances.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-6 rounded-full mx-auto" />
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
              className="crm-card p-6 flex flex-col justify-between h-full bg-white relative overflow-hidden group cursor-pointer"
            >
              {/* Top accent highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-yellow group-hover:bg-primary-maroon transition-colors" />

              <div>
                {/* Header Icon & Starting price */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary-maroon/5 border border-primary-maroon/10 flex items-center justify-center text-primary-maroon">
                    <Icon className="w-5.5 h-5.5 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-bold text-primary-maroon bg-primary-maroon/5 border border-primary-maroon/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Starts @ {service.priceStart}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-text-dark tracking-tight mb-2 group-hover:text-primary-maroon transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-text-dark/50 leading-relaxed font-light mb-5">
                  {service.description}
                </p>

                {/* Bullet Features */}
                <ul className="space-y-2 border-t border-border-subtle pt-4 mb-6">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-xs text-text-dark/75 font-medium">
                      <FiCheck className="text-primary-maroon/70 w-3.5 h-3.5 mt-0.5 mr-2 shrink-0 stroke-[2.5]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="flex items-center text-xs font-bold text-primary-maroon mt-auto group-hover:translate-x-1 transition-transform">
                <span className="mr-1">Book Service Now</span>
                <FiChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
