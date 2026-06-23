import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Book Service",
    desc: "Submit details in our quick booking form, specify your appliance issue, or call our phone desk.",
  },
  {
    step: "02",
    title: "Technician Visit",
    desc: "A verified regional HVAC specialist is assigned and arrives at your service location right on schedule.",
  },
  {
    step: "03",
    title: "Diagnostics & Quote",
    desc: "Our engineer runs tests, detects the malfunction, and provides a clear, upfront cost estimate.",
  },
  {
    step: "04",
    title: "Repair & Testing",
    desc: "We perform repairs on-site using original spare parts and verify operation before wrap-up.",
  },
];

const ServiceProcessSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="process" className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-3 bg-primary-maroon/5 px-3 py-1 rounded-full border border-primary-maroon/10">
          Workflow
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark mb-4">
          Our Simple <span className="text-primary-maroon">Service Process</span>
        </h2>
        <p className="text-sm sm:text-base text-text-dark/60 font-light leading-relaxed">
          We have designed a hassle-free operational procedure to ensure your home appliances get repaired quickly and transparently.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-6 rounded-full mx-auto" />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Connecting Line (Desktop) */}
        <div className="absolute top-[2.75rem] left-[12%] right-[12%] h-[1.5px] bg-primary-maroon/10 hidden lg:block pointer-events-none -z-10" />

        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="crm-card p-6 md:p-8 bg-white text-center flex flex-col items-center hover:border-primary-maroon/10 transition-all duration-300"
            variants={stepVariants}
          >
            {/* Number Indicator */}
            <div className="w-11 h-11 rounded-full bg-secondary-yellow text-primary-maroon border border-primary-maroon/10 flex items-center justify-center font-extrabold text-sm mb-5 shadow-inner">
              {item.step}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-text-dark mb-2 tracking-tight">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-text-dark/50 leading-relaxed font-light">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServiceProcessSection;
