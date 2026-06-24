import React from "react";
import { motion } from "framer-motion";
import { FiTool, FiShield, FiHeadphones } from "react-icons/fi";

const statsData = [
  {
    icon: FiTool,
    value: "5000+",
    label: "Services Completed",
  },
  {
    icon: FiShield,
    value: "90-Day",
    label: "Service Warranty",
  },
  {
    icon: FiHeadphones,
    value: "24/7",
    label: "Emergency Support",
  },
];

const StatsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6 -mt-10">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="premium-card p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(199,167,108,0.15)] group"
              variants={itemVariants}
            >
              {/* Soft yellow indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary-yellow to-secondary-yellow-dark" />

              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary-yellow mb-6 shadow-inner">
                <Icon className="w-6 h-6" />
              </div>

              {/* Stat Value */}
              <h3 className="text-4xl sm:text-5xl font-black text-gradient mb-2 tracking-tight">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-xs sm:text-sm text-white/60 font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default StatsSection;
