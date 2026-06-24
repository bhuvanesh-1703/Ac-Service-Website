import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppChat = () => {
  const phoneNumber = "916374009568";
  const defaultMessage = "Hi! I'm looking for AC/Appliance repair services. Can you help me?";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl cursor-pointer focus:outline-none group"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-50"></span>
        <FaWhatsapp className="w-7 h-7 z-10 group-hover:scale-110 transition-transform duration-200" />
      </motion.button>
    </AnimatePresence>
  );
};

export default WhatsAppChat;
