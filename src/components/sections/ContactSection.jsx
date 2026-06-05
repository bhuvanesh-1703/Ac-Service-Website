import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { FiUser, FiPhone, FiMapPin, FiMessageSquare, FiSettings, FiCheckCircle } from "react-icons/fi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    "Air Conditioner Service & Repair",
    "Refrigerator Service & Repair",
    "Washing Machine Service & Repair",
    "RO Water Purifier Service & Repair",
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }
    if (!formData.address.trim() || formData.address.trim().length < 8) {
      newErrors.address = "Address must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Mock API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        serviceType: "",
        address: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative z-10 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="Get In Touch"
        title="Book Your Service"
        highlightTitle="Appointment"
        subtitle="Fill out the details below, and our dispatch manager will contact you immediately to schedule a technician visit."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Booking details and cards */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Need Urgent Help?</h3>
            <p className="text-slate-400 font-light text-sm leading-relaxed">
              If your appliance has broken down unexpectedly, do not worry. Reach out to our emergency support center for instant same-day bookings.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-950/40 border border-sky-900/30 flex items-center justify-center text-sky-400">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Call Direct</span>
                  <a href="tel:+916374009568" className="text-white font-bold text-base hover:text-sky-400 transition-colors">
                    +91 63740 09568
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-950/40 border border-sky-900/30 flex items-center justify-center text-sky-400">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Location</span>
                  <span className="text-slate-300 font-light text-sm">
                    Duraisamy Puram, Rajapalayam-626117, Tamil Nadu.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice Badge */}
          <div className="glass-panel p-6 rounded-3xl bg-cyan-950/10 border-cyan-900/20 text-cyan-400 text-sm font-light">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              Service Guarantee
            </h4>
            All our replacement parts and services are backed by a minimum **90-Day Service Warranty**.
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative flex items-center bg-slate-900/50 border border-slate-800 focus-within:border-sky-500/50 rounded-2xl p-3.5 transition-colors">
                    <FiUser className="text-slate-500 mr-3 shrink-0" />
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0 placeholder-slate-600"
                    />
                  </div>
                  {errors.name && <span className="text-rose-500 text-xs mt-1 font-light">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-phone" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative flex items-center bg-slate-900/50 border border-slate-800 focus-within:border-sky-500/50 rounded-2xl p-3.5 transition-colors">
                    <FiPhone className="text-slate-500 mr-3 shrink-0" />
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0 placeholder-slate-600"
                    />
                  </div>
                  {errors.phone && <span className="text-rose-500 text-xs mt-1 font-light">{errors.phone}</span>}
                </div>
              </div>

              {/* Service Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-service" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Service Required</label>
                <div className="relative flex items-center bg-slate-900/50 border border-slate-800 focus-within:border-sky-500/50 rounded-2xl p-3.5 transition-colors">
                  <FiSettings className="text-slate-500 mr-3 shrink-0" />
                  <select
                    id="form-service"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0 placeholder-slate-600"
                  >
                    <option value="" disabled className="bg-slate-950 text-slate-600">Select Service Type</option>
                    {servicesList.map((service, idx) => (
                      <option key={idx} value={service} className="bg-slate-950 text-white">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.serviceType && <span className="text-rose-500 text-xs mt-1 font-light">{errors.serviceType}</span>}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-address" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Service Address</label>
                <div className="relative flex items-start bg-slate-900/50 border border-slate-800 focus-within:border-sky-500/50 rounded-2xl p-3.5 transition-colors">
                  <FiMapPin className="text-slate-500 mr-3 mt-1 shrink-0" />
                  <textarea
                    id="form-address"
                    name="address"
                    rows="3"
                    placeholder="Enter your street address, building number, locality..."
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0 placeholder-slate-600 resize-none"
                  />
                </div>
                {errors.address && <span className="text-rose-500 text-xs mt-1 font-light">{errors.address}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="form-message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Additional Message (Optional)</label>
                <div className="relative flex items-start bg-slate-900/50 border border-slate-800 focus-within:border-sky-500/50 rounded-2xl p-3.5 transition-colors">
                  <FiMessageSquare className="text-slate-500 mr-3 mt-1 shrink-0" />
                  <textarea
                    id="form-message"
                    name="message"
                    rows="2"
                    placeholder="Briefly describe the issue (e.g. AC cooling fan not rotating, fridge leaking water...)"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-white text-sm w-full focus:ring-0 placeholder-slate-600 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-sky-500/10 hover:shadow-sky-500/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Booking...</span>
                  </div>
                ) : (
                  <span>Book Appointment Now</span>
                )}
              </button>
            </form>

            {/* Success Overlay Modal */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="flex flex-col items-center"
                  >
                    <FiCheckCircle className="w-16 h-16 text-emerald-400 mb-6 drop-shadow-lg" />
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Booking Confirmed!</h3>
                    <p className="text-slate-400 font-light text-sm max-w-sm mb-8 leading-relaxed">
                      Thank you! Your booking request has been registered. Our dispatch manager will contact you at your phone number shortly to verify.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all"
                    >
                      Done
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
