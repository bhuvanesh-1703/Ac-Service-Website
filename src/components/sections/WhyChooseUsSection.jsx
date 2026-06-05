import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { FiUserCheck, FiZap, FiDollarSign, FiShield, FiPhoneCall } from "react-icons/fi";

const highlights = [
  {
    icon: FiUserCheck,
    title: "Experienced Technicians",
    desc: "Our team consists of verified, background-checked, and highly skilled appliance specialists with years of training.",
  },
  {
    icon: FiZap,
    title: "Same Day Service",
    desc: "We value your time. Book a service and get a technician at your doorstep within 2 to 4 hours in most situations.",
  },
  {
    icon: FiDollarSign,
    title: "Affordable Pricing",
    desc: "Transparent upfront quotes with no hidden costs. Quality repairs that respect your budget.",
  },
  {
    icon: FiShield,
    title: "Genuine Spare Parts",
    desc: "We strictly use brand-original, high-grade replacement parts backed by warranty periods for peace of mind.",
  },
  {
    icon: FiPhoneCall,
    title: "24/7 Customer Support",
    desc: "Our booking desk and customer care services are available round the clock to address emergencies.",
  },
];

const WhyChooseUsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="why-choose-us" className="py-24 relative z-10 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="Our Value"
        title="Why Customers Choose"
        highlightTitle="V&amp;V Services"
        subtitle="We strive to deliver exceptional quality home appliance solutions with a focus on trust, efficiency, and customer satisfaction."
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className="glass-panel p-8 rounded-3xl hover:border-sky-500/25 transition-all duration-300 group"
              variants={cardVariants}
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-950/50 border border-sky-900/30 flex items-center justify-center text-sky-400 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default WhyChooseUsSection;
