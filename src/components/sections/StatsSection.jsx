import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";
import { FiUsers, FiCheckSquare, FiAward, FiHeadphones } from "react-icons/fi";

const statsData = [
  {
    icon: FiUsers,
    value: "5000",
    suffix: "+",
    label: "Happy Customers",
  },
  {
    icon: FiCheckSquare,
    value: "3000",
    suffix: "+",
    label: "Repairs Completed",
  },
  {
    icon: FiAward,
    value: "10",
    suffix: "+",
    label: "Years Experience",
  },
  {
    icon: FiHeadphones,
    value: "24",
    suffix: "/7 Support",
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
    <section className="py-20 relative z-10 max-w-7xl mx-auto px-6">
      <motion.div
        className="glass-panel rounded-3xl p-10 md:p-14 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Background visual details */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-550/5 via-cyan-550/5 to-transparent pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 relative z-10">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={itemVariants}
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-sky-950/40 border border-sky-900/30 flex items-center justify-center text-sky-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Counter Value */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>

                {/* Label */}
                <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
