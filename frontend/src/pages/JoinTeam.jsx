import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import API_URL from "../Config/config";
import { 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiBriefcase, 
  FiFileText, 
  FiCheckCircle, 
  FiArrowLeft,
  FiSend
} from "react-icons/fi";

const SPECIALIZATIONS = [
  { id: "ac", label: "AC Repair & Installation" },
  { id: "refrigerator", label: "Refrigerator Servicing" },
  { id: "washing_machine", label: "Washing Machine Repair" },
  { id: "ro_purifier", label: "RO Water Purifier Servicing" }
];

const JoinTeam = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    experience: "",
    specialization: [],
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (id) => {
    const isSelected = formData.specialization.includes(id);
    const updatedSpecialization = isSelected
      ? formData.specialization.filter((item) => item !== id)
      : [...formData.specialization, id];

    setFormData({
      ...formData,
      specialization: updatedSpecialization
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation checks
    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!formData.experience || formData.experience < 0) {
      setError("Please enter a valid experience level.");
      return;
    }
    if (!formData.specialization.length) {
      setError("Please select at least one specialization.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/careers/apply`, {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        experience: Number(formData.experience),
        specialization: formData.specialization,
        notes: formData.notes
      });

      if (res.data && res.data.success) {
        setSuccess(true);
      } else {
        throw new Error(res.data.error || "Failed to submit application.");
      }
    } catch (err) {
      console.error("Submit Job Application Error:", err);
      setError(err.response?.data?.error || err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-ivory py-24 px-6 md:px-12 flex flex-col items-center justify-center select-none">
      <div className="max-w-2xl w-full">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-maroon hover:text-primary-maroon-dark transition-colors mb-6"
        >
          <FiArrowLeft className="w-4 h-4 text-secondary-yellow font-extrabold" />
          <span>Back to Home</span>
        </Link>

        {/* Card Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card-bg border border-border-subtle rounded-3xl p-8 md:p-12 shadow-xl shadow-primary-maroon/3 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold text-text-dark tracking-tight">
                    Join Our Technician Team
                  </h1>
                  <p className="text-sm text-text-dark/65 mt-2 leading-relaxed font-medium">
                    Are you an expert in repairing ACs, refrigerators, purifiers, or washing machines? Apply today and work with V&V Services in Rajapalayam!
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-semibold text-red-700"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-text-dark/70">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          disabled={loading}
                          className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3.5 pl-11 pr-4 text-sm text-text-dark outline-none focus:ring-1 focus:ring-primary-maroon/35 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-text-dark/70">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 9876543210"
                          disabled={loading}
                          className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3.5 pl-11 pr-4 text-sm text-text-dark outline-none focus:ring-1 focus:ring-primary-maroon/35 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Experience Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-dark/70">
                        Email Address
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          disabled={loading}
                          className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3.5 pl-11 pr-4 text-sm text-text-dark outline-none focus:ring-1 focus:ring-primary-maroon/35 transition-all"
                        />
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="experience" className="text-xs font-bold uppercase tracking-wider text-text-dark/70">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          id="experience"
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Years on the job"
                          min="0"
                          disabled={loading}
                          className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3.5 pl-11 pr-4 text-sm text-text-dark outline-none focus:ring-1 focus:ring-primary-maroon/35 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Specializations (Checkboxes) */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-text-dark/70">
                      Your Specializations <span className="text-red-500">*</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {SPECIALIZATIONS.map((spec) => {
                        const isChecked = formData.specialization.includes(spec.id);
                        return (
                          <div
                            key={spec.id}
                            onClick={() => !loading && handleCheckboxChange(spec.id)}
                            className={`flex items-center gap-3 border rounded-2xl p-4.5 cursor-pointer transition-all select-none ${
                              isChecked
                                ? "bg-primary-maroon/5 border-primary-maroon text-primary-maroon font-bold shadow-sm"
                                : "bg-bg-ivory border-border-subtle hover:bg-primary-maroon/5 text-text-dark/85"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              disabled={loading}
                              className="w-4.5 h-4.5 accent-primary-maroon cursor-pointer rounded"
                            />
                            <span className="text-sm">{spec.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description / Notes */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-text-dark/70">
                      Experience Details & Notes
                    </label>
                    <div className="relative">
                      <FiFileText className="absolute left-4 top-4.5 text-gray-400 w-4 h-4" />
                      <textarea
                        id="notes"
                        name="notes"
                        rows="4"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Mention your previous employments, certs, or specific service skills..."
                        disabled={loading}
                        className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3.5 pl-11 pr-4 text-sm text-text-dark outline-none focus:ring-1 focus:ring-primary-maroon/35 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      type="submit"
                      disabled={loading}
                      className={`flex items-center justify-center gap-2.5 w-full bg-primary-maroon hover:bg-primary-maroon-dark text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-md shadow-primary-maroon/10 focus:outline-none ${
                        loading ? "opacity-75 cursor-default" : "cursor-pointer"
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Application...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="w-4 h-4 text-secondary-yellow font-extrabold" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 flex flex-col items-center"
              >
                {/* Checkmark icon animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 border border-green-200"
                >
                  <FiCheckCircle className="w-10 h-10 font-bold" />
                </motion.div>

                <h2 className="text-3xl font-extrabold text-text-dark tracking-tight">
                  Application Submitted!
                </h2>
                <p className="text-sm text-text-dark/70 mt-3 max-w-sm leading-relaxed font-medium">
                  Thank you for applying to V&V Services. We have received your registration and our hiring coordinator will contact you by phone shortly.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    to="/"
                    className="flex items-center justify-center gap-2 bg-primary-maroon hover:bg-primary-maroon-dark text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md shadow-primary-maroon/10 cursor-pointer"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinTeam;
