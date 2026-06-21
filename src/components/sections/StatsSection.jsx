import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiCheckSquare, FiAward, FiHeadphones } from "react-icons/fi";

const statsData = [
  {
    icon: FiUsers,
    value: "5000+",
    label: "Happy Customers",
  },
  {
    icon: FiCheckSquare,
    value: "3000+",
    label: "Repairs Completed",
  },
  {
    icon: FiAward,
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: FiHeadphones,
    value: "24/7 Support",
    label: "Customer Support",
  },
];

const StatsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-12 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6">
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
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
              className="crm-card p-6 md:p-8 flex flex-col items-center text-center bg-white relative overflow-hidden"
              variants={itemVariants}
            >
              {/* Soft yellow indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-yellow" />

              {/* Icon Circle */}
              <div className="w-11 h-11 rounded-xl bg-primary-maroon/5 border border-primary-maroon/10 flex items-center justify-center text-primary-maroon mb-4">
                <Icon className="w-5 h-5" />
              </div>

              {/* Stat Value */}
              <h3 className="text-2xl sm:text-3xl font-black text-text-dark mb-1.5 tracking-tight font-serif">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-[10px] sm:text-xs text-text-dark/50 font-bold uppercase tracking-wider">
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
