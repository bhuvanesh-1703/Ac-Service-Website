import React from "react";
import { motion } from "framer-motion";
import { FiUserCheck, FiZap, FiDollarSign, FiShield, FiPhoneCall } from "react-icons/fi";

const highlights = [
  {
    icon: FiUserCheck,
    title: "Experienced Technicians",
    desc: "Our team consists of verified, background-checked, and certified field engineers specialized in domestic appliance repairs.",
  },
  {
    icon: FiZap,
    title: "Same Day Service",
    desc: "We value your schedule. Confirm an appointment and get an expert at your doorstep within 2 to 4 hours.",
  },
  {
    icon: FiDollarSign,
    title: "Affordable Pricing",
    desc: "Transparent upfront quotes with no hidden diagnostics costs. Premium repairs that fit your budget.",
  },
  {
    icon: FiShield,
    title: "Genuine Spare Parts",
    desc: "We strictly install brand-original, manufacturer-backed replacement components for ultimate peace of mind.",
  },
  {
    icon: FiPhoneCall,
    title: "24/7 Support Desk",
    desc: "Our customer booking support desk is active round the clock to address emergencies and same-day scheduling.",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="why-choose-us" className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-3 bg-primary-maroon/5 px-3 py-1 rounded-full border border-primary-maroon/10">
          Our Value
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark mb-4">
          Why Customers Choose <span className="text-primary-maroon">V&amp;V Services</span>
        </h2>
        <p className="text-sm sm:text-base text-text-dark/60 font-light leading-relaxed">
          We strive to deliver exceptional quality home appliance solutions with a focus on trust, efficiency, and satisfaction.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-6 rounded-full mx-auto" />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              className="crm-card p-6 md:p-8 bg-white hover:border-primary-maroon/20 transition-all duration-300 group"
              variants={cardVariants}
            >
              {/* Icon Frame */}
              <div className="w-11 h-11 rounded-xl bg-primary-maroon/5 border border-primary-maroon/10 flex items-center justify-center text-primary-maroon mb-5 group-hover:bg-primary-maroon group-hover:text-white transition-all duration-300">
                <Icon className="w-5.5 h-5.5" />
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
          );
        })}
      </motion.div>
    </section>
  );
};

export default WhyChooseUsSection;
