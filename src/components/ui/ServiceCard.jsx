import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiCheck } from "react-icons/fi";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  features = [], 
  priceStart, 
  index, 
  onHoverStart,
  onHoverEnd
}) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    // Set rotation degrees (max 10 degrees)
    setRotateX(-mouseY * 12);
    setRotateY(mouseX * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    if (onHoverEnd) onHoverEnd();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-panel glass-panel-hover flex flex-col justify-between h-full p-8 rounded-3xl cursor-pointer relative overflow-hidden select-none"
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHoverStart}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      id={`service-card-${index}`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

      <div>
        {/* Icon Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/10 to-cyan-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-2xl shadow-inner shadow-sky-500/10">
            <Icon className="w-7 h-7" />
          </div>
          {priceStart && (
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/30">
              Starts @ {priceStart}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-400 font-light mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-3 mb-8 border-t border-slate-800/60 pt-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-300 font-light">
              <span className="text-sky-400 mt-1 mr-2 shrink-0">
                <FiCheck className="w-4 h-4" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="flex items-center text-sm font-semibold text-sky-400 mt-auto group/btn">
        <span className="mr-1 group-hover/btn:mr-2 transition-all">Book Service Now</span>
        <FiChevronRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
