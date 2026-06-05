import React from "react";
import SectionHeader from "../ui/SectionHeader";
import ServiceCard from "../ui/ServiceCard";
import { FiWind, FiCloudSnow, FiRefreshCw, FiDroplet } from "react-icons/fi";

const servicesData = [
  {
    title: "Air Conditioner Service & Repair",
    description: "Keep your home cool with professional AC installation, cleaning, cooling fixes, and gas charging.",
    icon: FiWind,
    features: [
      "Deep Coil & Filter Cleaning",
      "Gas Leakage Fix & Top-up",
      "Compressor Repair & Replacement",
      "Thermostat & Fan Motor Fixes",
      "Window & Split AC Installation"
    ],
    priceStart: "₹499",
  },
  {
    title: "Refrigerator Service & Repair",
    description: "Fast diagnostics and repair for single door, double door, and side-by-side refrigerators.",
    icon: FiCloudSnow,
    features: [
      "Cooling Loss Repair",
      "Compressor Replacement",
      "Thermostat & Fan Motor Fixing",
      "Gas Charging & Leak Fixes",
      "Defrost Issue Resolutions"
    ],
    priceStart: "₹399",
  },
  {
    title: "Washing Machine Service & Repair",
    description: "Reliable service for top-load, front-load, automatic, and semi-automatic washing machines.",
    icon: FiRefreshCw,
    features: [
      "Drum & Bearing Repair",
      "Inlet/Drain Valve Replacement",
      "PCB / Motherboard Repair",
      "Motor & Belt Replacements",
      "Error Code Clearings"
    ],
    priceStart: "₹500",
  },
  {
    title: "RO Water Purifier Service & Repair",
    description: "Pure and healthy drinking water with timely membrane, pump, and filter maintenance services.",
    icon: FiDroplet,
    features: [
      "Sediment & Carbon Filter Change",
      "RO Membrane Replacement",
      "Booster Pump Diagnostics & Repair",
      "Water Taste Tuning (TDS Balance)",
      "Deep Servicing & Sanitization"
    ],
    priceStart: "₹199",
  },
];

const ServicesSection = ({ setHoveredIndex }) => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 relative z-10 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="Our Expertise"
        title="Professional Services for"
        highlightTitle="Your Comfort"
        subtitle="We offer top-notch diagnostic, maintenance, and repair services for all your essential household cooling and cleaning appliances."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service, index) => (
          <div key={index} onClick={handleScrollToContact}>
            <ServiceCard
              index={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              priceStart={service.priceStart}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
