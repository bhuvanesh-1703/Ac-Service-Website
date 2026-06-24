import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import API_URL from "../Config/config";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
  FiSettings,
  FiCheckCircle,
  FiClock,
  FiShield,
} from "react-icons/fi";

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
  const [submitError, setSubmitError] = useState("");

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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const problemText =
        formData.serviceType +
        (formData.message ? ` - ${formData.message}` : "");
      const res = await axios.post(`${API_URL}/api/bookings`, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        problem: problemText,
      });

      if (res.data && res.data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          serviceType: "",
          address: "",
          message: "",
        });
      } else {
        throw new Error(res.data.error || "Failed to submit booking.");
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      setSubmitError(
        err.response?.data?.error ||
          err.message ||
          "An error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6"
    >
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-3 bg-primary-maroon/5 px-3 py-1 rounded-full border border-primary-maroon/10">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark mb-4">
          Book Your Service{" "}
          <span className="text-primary-maroon">Appointment</span>
        </h2>
        <p className="text-sm sm:text-base text-text-dark/60 font-light leading-relaxed">
          Fill out the details below, and our team will contact you immediately
          to schedule a technician visit.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-6 rounded-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Info and Support cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="crm-card p-8 bg-card-bg space-y-6">
            <h3 className="text-xl font-extrabold text-text-dark tracking-tight">
              Need Urgent Help?
            </h3>
            <p className="text-xs text-text-dark/60 font-light leading-relaxed">
              If your appliance has broken down unexpectedly, do not worry.
              Reach out to our emergency support center for instant bookings.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {/* Phone info */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-maroon/5 border border-primary-maroon/10 flex items-center justify-center text-primary-maroon shrink-0">
                  <FiPhone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">
                    Call Direct
                  </span>
                  <a
                    href="tel:+916374009568"
                    className="text-text-dark font-extrabold text-sm hover:text-primary-maroon transition-colors block mt-0.5"
                  >
                    +91 63740 09568
                  </a>
                </div>
              </div>

              {/* Office hours */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-maroon/5 border border-primary-maroon/10 flex items-center justify-center text-primary-maroon shrink-0">
                  <FiClock className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">
                    Service Hours
                  </span>
                  <span className="text-text-dark font-semibold text-xs block mt-0.5">
                    Mon - Sun (8:00 AM - 9:00 PM)
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-maroon/5 border border-primary-maroon/10 flex items-center justify-center text-primary-maroon shrink-0 mt-0.5">
                  <FiMapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-text-dark/70 font-light text-xs block mt-0.5 leading-relaxed">
                    Duraisamy Puram, Rajapalayam-626117, Tamil Nadu.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice Badge */}
          <div className="crm-card p-6 bg-card-bg border-l-4 border-l-secondary-yellow flex gap-4 items-start">
            <div className="w-9 h-9 rounded-xl bg-secondary-yellow/15 flex items-center justify-center text-primary-maroon shrink-0 mt-0.5">
              <FiShield className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-text-dark">
                90-Day Warranty Service
              </h4>
              <p className="text-[11px] text-text-dark/60 font-light leading-relaxed mt-1">
                All our replacement spare components and labor works are backed
                by a minimum **90-Day Service Warranty**.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:col-span-7">
          <div className="crm-card p-8 md:p-10 bg-card-bg relative overflow-hidden">
            {submitError && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-semibold text-red-700">
                ⚠️ {submitError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="form-name"
                    className="text-[10px] font-bold text-text-dark/50 uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <div className="flex items-center bg-bg-ivory border border-border-subtle focus-within:border-primary-maroon/40 rounded-xl px-3 py-2.5 transition-colors">
                    <FiUser className="text-text-dark/40 mr-2.5 shrink-0 w-4 h-4" />
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 text-text-dark placeholder-text-dark/30"
                    />
                  </div>
                  {errors.name && (
                    <span className="text-primary-maroon text-xs font-semibold">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="form-phone"
                    className="text-[10px] font-bold text-text-dark/50 uppercase tracking-wider"
                  >
                    Phone Number
                  </label>
                  <div className="flex items-center bg-bg-ivory border border-border-subtle focus-within:border-primary-maroon/40 rounded-xl px-3 py-2.5 transition-colors">
                    <FiPhone className="text-text-dark/40 mr-2.5 shrink-0 w-4 h-4" />
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 text-text-dark placeholder-text-dark/30"
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-primary-maroon text-xs font-semibold">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Service Type */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="form-service"
                  className="text-[10px] font-bold text-text-dark/50 uppercase tracking-wider"
                >
                  Service Required
                </label>
                <div className="flex items-center bg-bg-ivory border border-border-subtle focus-within:border-primary-maroon/40 rounded-xl px-3 py-2.5 transition-colors">
                  <FiSettings className="text-text-dark/40 mr-2.5 shrink-0 w-4 h-4" />
                  <select
                    id="form-service"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 text-text-dark placeholder-text-dark/30 cursor-pointer"
                  >
                    <option value="" disabled className="text-text-dark/35">
                      Select Appliance Service
                    </option>
                    {servicesList.map((service, idx) => (
                      <option
                        key={idx}
                        value={service}
                        className="text-text-dark"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.serviceType && (
                  <span className="text-primary-maroon text-xs font-semibold">
                    {errors.serviceType}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="form-address"
                  className="text-[10px] font-bold text-text-dark/50 uppercase tracking-wider"
                >
                  Service Address
                </label>
                <div className="flex items-start bg-bg-ivory border border-border-subtle focus-within:border-primary-maroon/40 rounded-xl px-3 py-2.5 transition-colors">
                  <FiMapPin className="text-text-dark/40 mr-2.5 mt-0.5 shrink-0 w-4 h-4" />
                  <textarea
                    id="form-address"
                    name="address"
                    rows="3.5"
                    placeholder="Enter your street address, building number, locality..."
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 text-text-dark placeholder-text-dark/30 resize-none"
                  />
                </div>
                {errors.address && (
                  <span className="text-primary-maroon text-xs font-semibold">
                    {errors.address}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="form-message"
                  className="text-[10px] font-bold text-text-dark/50 uppercase tracking-wider"
                >
                  Additional Message (Optional)
                </label>
                <div className="flex items-start bg-bg-ivory border border-border-subtle focus-within:border-primary-maroon/40 rounded-xl px-3 py-2.5 transition-colors">
                  <FiMessageSquare className="text-text-dark/40 mr-2.5 mt-0.5 shrink-0 w-4 h-4" />
                  <textarea
                    id="form-message"
                    name="message"
                    rows="2"
                    placeholder="Briefly describe the issue (e.g. AC fan noise, fridge cooling loss...)"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 text-text-dark placeholder-text-dark/30 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-maroon hover:bg-primary-maroon-dark text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-primary-maroon/10 transform active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer mt-2"
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
                  className="absolute inset-0 bg-bg-ivory/95 flex flex-col items-center justify-center text-center p-8 z-20"
                >
                  <motion.div
                    initial={{ scale: 0.95, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 15 }}
                    className="flex flex-col items-center"
                  >
                    <FiCheckCircle className="w-16 h-16 text-primary-maroon mb-6 drop-shadow-md" />
                    <h3 className="text-xl font-extrabold text-text-dark tracking-tight mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-xs text-text-dark/65 max-w-xs mb-8 leading-relaxed">
                      Thank you! Your booking request has been registered. Our
                      dispatch manager will contact you at your phone number
                      shortly to verify.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-primary-maroon hover:bg-primary-maroon-dark text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-primary-maroon/15"
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
