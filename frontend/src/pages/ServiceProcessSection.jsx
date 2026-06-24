import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Book Service",
    desc: "Submit details via our quick booking form or call our support desk to schedule a service.",
  },
  {
    step: "02",
    title: "Technician Assigned",
    desc: "A verified regional HVAC specialist is matched to your request and arrives on time.",
  },
  {
    step: "03",
    title: "Repair Completed",
    desc: "Diagnostics are run, an upfront quote is provided, and repairs are completed on-site.",
  },
  {
    step: "04",
    title: "Warranty Support",
    desc: "Enjoy peace of mind with our 90-Day Warranty. If any covered issues arise, we resolve them quickly.",
  },
];

const ServiceProcessSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
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
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-secondary-yellow mb-3 bg-secondary-yellow/10 px-4 py-1.5 rounded-full border border-secondary-yellow/20">
          How It Works
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          Our Streamlined <span className="text-gradient">Service Process</span>
        </h2>
        <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
          We have designed a hassle-free, transparent procedure to ensure your home appliances get repaired quickly without any surprises.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Connecting Line (Desktop) */}
        <div className="absolute top-[3rem] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-secondary-yellow/20 to-transparent hidden lg:block pointer-events-none -z-10" />

        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="premium-card p-8 bg-card-bg text-center flex flex-col items-center group hover:border-secondary-yellow/30"
            variants={stepVariants}
          >
            {/* Number Indicator */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-maroon to-primary-maroon-dark text-white border border-white/10 flex items-center justify-center font-black text-lg mb-6 shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300">
              {item.step}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed font-light">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServiceProcessSection;
