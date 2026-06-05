import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";

const steps = [
  {
    step: "01",
    title: "Book Service",
    desc: "Fill our simple online booking form, request a callback, or dial our direct support number directly.",
  },
  {
    step: "02",
    title: "Technician Visit",
    desc: "A verified specialist is assigned to your order and arrives at your location right on schedule.",
  },
  {
    step: "03",
    title: "Diagnostics & Quote",
    desc: "Our technician runs tests on your device, detects the issue, and provides a clear, upfront estimate.",
  },
  {
    step: "04",
    title: "Repair & Testing",
    desc: "We perform repairs on the spot using original components and verify proper operation before leaving.",
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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="process" className="py-24 relative z-10 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="Workflow"
        title="Our Simple"
        highlightTitle="Service Process"
        subtitle="We have designed a hassle-free procedure to ensure that your home appliances get repaired as quickly and transparently as possible."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Visual connecting lines on larger viewports */}
        <div className="absolute top-[3.25rem] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-sky-500/10 via-cyan-500/20 to-sky-500/10 hidden lg:block pointer-events-none -z-10" />

        {steps.map((item, index) => (
          <motion.div
            key={index}
            className="glass-panel p-8 rounded-3xl relative text-center flex flex-col items-center hover:border-sky-500/10 transition-all duration-300"
            variants={stepVariants}
          >
            {/* Number Indicator */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500/20 to-cyan-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-extrabold text-lg mb-6 shadow-md shadow-sky-950/20 z-10">
              {item.step}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServiceProcessSection;
