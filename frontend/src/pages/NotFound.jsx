import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-ivory flex items-center justify-center px-6 py-24 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white border border-border-subtle rounded-2xl p-8 text-center shadow-xl shadow-primary-maroon/5 flex flex-col items-center"
      >
        {/* Animated Warning Icon */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -3, 3, -3, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          }}
          className="w-20 h-20 bg-secondary-yellow/30 border border-secondary-yellow rounded-2xl flex items-center justify-center text-primary-maroon mb-6"
        >
          <FiAlertTriangle className="w-10 h-10 font-bold" />
        </motion.div>

        {/* 404 Code Badge */}
        <span className="text-xs font-extrabold tracking-widest text-primary-maroon bg-primary-maroon/10 px-3 py-1 rounded-full uppercase mb-4">
          Error Code 404
        </span>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-text-dark tracking-tight mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-sm text-text-dark/70 leading-relaxed mb-8">
          The link you followed may be broken, or the page may have been removed. Let's get you back on track to booking your services!
        </p>

        {/* Action button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-primary-maroon hover:bg-primary-maroon-dark text-white font-bold py-3.5 px-6 rounded-xl transition-colors shadow-md shadow-primary-maroon/10 cursor-pointer"
          >
            <FiHome className="w-4 h-4 text-secondary-yellow" />
            <span>Return to Homepage</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
