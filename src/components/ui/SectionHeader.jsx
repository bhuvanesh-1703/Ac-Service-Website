import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({ eyebrow, title, highlightTitle, subtitle, align = "center" }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const isLeft = align === "left";

  return (
    <motion.div
      className={`max-w-3xl mb-16 ${isLeft ? "text-left mr-auto" : "text-center mx-auto"}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-sky-400 mb-3 bg-sky-950/50 px-3 py-1 rounded-full border border-sky-900/30">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
        {title}{" "}
        {highlightTitle && (
          <span className="text-gradient-blue-cyan">{highlightTitle}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-12 bg-sky-500 mt-6 rounded-full ${isLeft ? "mr-auto" : "mx-auto"}`} />
    </motion.div>
  );
};

export default SectionHeader;
