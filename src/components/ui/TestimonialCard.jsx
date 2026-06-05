import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ name, role, review, rating = 5, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Decorative quote mark */}
      <span className="absolute -top-6 -right-2 text-8xl font-serif text-slate-800/20 pointer-events-none select-none">
        &ldquo;
      </span>

      <div>
        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-slate-600"}`}
            />
          ))}
        </div>

        {/* Review body */}
        <p className="text-slate-300 text-sm md:text-base font-light italic leading-relaxed mb-6">
          &ldquo;{review}&rdquo;
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex items-center gap-4 mt-auto border-t border-slate-800/40 pt-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wide">{name}</h4>
          <span className="text-xs text-sky-400 font-light">{role}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
