import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiDollarSign, FiClock, FiSliders, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

// Import generated images
import filterBefore from "../../assets/showcase_filter_before.png";
import filterAfter from "../../assets/showcase_filter_after.png";
import coilsBefore from "../../assets/showcase_coils_before.png";
import coilsAfter from "../../assets/showcase_coils_after.png";
import wiringBefore from "../../assets/showcase_wiring_before.png";
import wiringAfter from "../../assets/showcase_wiring_after.png";

const showcaseCases = [
  {
    id: "filter",
    label: "Filter Service",
    title: "Air Filter Cleaning & Sanitization",
    desc: "Clogged and dusty filters restrict airflow, forcing the compressor to run longer and recirculating allergens. Our service deep-cleans the mesh filter to restore pure air and unrestricted airflow.",
    beforeImg: filterBefore,
    afterImg: filterAfter,
    beforeLabel: "Clogged & Dusty Filter",
    afterLabel: "Washed & Sanitized Filter",
  },
  {
    id: "coils",
    label: "Coil Deep Clean",
    title: "Condenser Coil Chemical Pressure Wash",
    desc: "Outdoor coils accumulate thick grime, blocking heat dissipation. This raises AC pressure and causes cooling loss. We perform a specialized chemical wash to bring heat exchange back to 100% efficiency.",
    beforeImg: coilsBefore,
    afterImg: coilsAfter,
    beforeLabel: "Grimy, Dusty Coils",
    afterLabel: "Shinining chemical-washed fins",
  },
  {
    id: "wiring",
    label: "Wiring Restoration",
    title: "Electrical Connection & Terminal Repair",
    desc: "Loose or oxidized wiring terminals increase resistance, leading to overheating, sparks, or compressor failure. We clean, rewire, tighten terminal blocks, and apply protective heat-shrink sleeves.",
    beforeImg: wiringBefore,
    afterImg: wiringAfter,
    beforeLabel: "Oxidized & Burnt Contacts",
    afterLabel: "Secure Labeled Terminals",
  },
];

const InteractiveShowcaseSection = () => {
  const [activeTab, setActiveTab] = useState("showcase"); // "showcase" or "calculator"
  const [activeCase, setActiveCase] = useState("filter");
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculator states
  const [acUnits, setAcUnits] = useState(2);
  const [dailyHours, setDailyHours] = useState(8);
  const [usageMonths, setUsageMonths] = useState(6);
  const [acType, setAcType] = useState("3star"); // "3star" (non-inverter/older) or "5star" (inverter/efficient)

  const currentCase = showcaseCases.find((c) => c.id === activeCase) || showcaseCases[0];

  // Dragging event handlers for before/after slider
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleStart = (clientX) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  // Add global mouse up listener so dragging ends even if mouse leaves container
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  // Calculator Logic
  // Unserviced AC consumes ~20% more power due to dirty coils/filters.
  // Base power consumption per hour in kW:
  const baseKW = acType === "3star" ? 1.5 : 1.0;
  const daysPerYear = usageMonths * 30;
  // Yearly power consumption = units * hours/day * days/year * base kW
  const baseYearlyKWh = acUnits * dailyHours * daysPerYear * baseKW;
  // Power saved with 20% efficiency recovery
  const powerSavedKWh = Math.round(baseYearlyKWh * 0.20);
  // Money saved in Rupees (at ₹8 per unit)
  const moneySavedINR = Math.round(powerSavedKWh * 8);
  // CO2 emissions avoided (approx 0.82 kg CO2 per kWh of grid electricity in India)
  const co2AvoidedKg = Math.round(powerSavedKWh * 0.82);
  // Estimated Lifespan Extension
  const lifespanExtension = Math.min(4, Math.max(1, Math.round(acUnits * 0.5 + dailyHours * 0.25)));

  return (
    <section id="interactive-showcase" className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-3 bg-primary-maroon/5 px-3 py-1 rounded-full border border-primary-maroon/10">
          Visual Showcase
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark mb-4">
          See the <span className="text-primary-maroon">V&V Difference</span>
        </h2>
        <p className="text-sm sm:text-base text-text-dark/60 font-light leading-relaxed">
          Interact with our slider to see our repair results, or use our smart savings calculator to see how regular service keeps your utility bills low.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-6 rounded-full mx-auto" />
      </div>

      {/* Main Tab Controls */}
      <div className="flex justify-center mb-10">
        <div className="bg-white border border-border-subtle p-1.5 rounded-2xl flex gap-1 shadow-sm">
          <button
            onClick={() => setActiveTab("showcase")}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "showcase"
                ? "bg-primary-maroon text-white shadow-md shadow-primary-maroon/15"
                : "text-text-dark/65 hover:text-primary-maroon hover:bg-primary-maroon/5"
            }`}
          >
            Before & After Slider
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "calculator"
                ? "bg-primary-maroon text-white shadow-md shadow-primary-maroon/15"
                : "text-text-dark/65 hover:text-primary-maroon hover:bg-primary-maroon/5"
            }`}
          >
            Savings Calculator
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="min-h-[460px]">
        <AnimatePresence mode="wait">
          {activeTab === "showcase" ? (
            <motion.div
              key="showcase-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side Controls & Descriptions */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex flex-wrap gap-2.5">
                  {showcaseCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveCase(c.id);
                        setSliderPos(50);
                      }}
                      className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeCase === c.id
                          ? "bg-primary-maroon/5 border-primary-maroon text-primary-maroon shadow-sm"
                          : "bg-white border-border-subtle hover:border-text-dark/25 text-text-dark/65"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-text-dark tracking-tight leading-tight">
                    {currentCase.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-dark/60 leading-relaxed font-light">
                    {currentCase.desc}
                  </p>
                </div>

                <div className="border-t border-border-subtle/60 pt-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs font-extrabold shrink-0">✕</span>
                    <span className="text-xs font-medium text-text-dark/75"><span className="font-bold text-red-700">Before:</span> {currentCase.beforeLabel}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-extrabold shrink-0">✓</span>
                    <span className="text-xs font-medium text-text-dark/75"><span className="font-bold text-green-700">After:</span> {currentCase.afterLabel}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-text-dark/45 font-medium italic">
                    💡 Try dragging the vertical bar on the image to slide between the serviced and unserviced states.
                  </p>
                </div>
              </div>

              {/* Right Side Slider Frame */}
              <div className="lg:col-span-7 flex justify-center">
                <div
                  ref={containerRef}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleStart(e.clientX);
                  }}
                  onMouseMove={handleMouseMove}
                  onTouchStart={(e) => {
                    if (e.touches.length > 0) {
                      handleStart(e.touches[0].clientX);
                    }
                  }}
                  onTouchMove={handleTouchMove}
                  className="relative w-full aspect-[4/3] max-w-[600px] bg-white border border-border-subtle rounded-3xl overflow-hidden shadow-lg select-none cursor-ew-resize group"
                >
                  {/* Before State (Unserviced) - Background Layer */}
                  <img
                    src={currentCase.beforeImg}
                    alt={currentCase.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute bottom-4 left-4 z-10 bg-red-950/75 border border-red-500/25 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-red-100 backdrop-blur-sm uppercase shadow-sm">
                    Before
                  </div>

                  {/* After State (Cleaned/Serviced) - Clip-Path Overlay Layer */}
                  <img
                    src={currentCase.afterImg}
                    alt={currentCase.afterLabel}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
                    style={{
                      clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
                    }}
                  />
                  <div className="absolute bottom-4 right-4 z-20 bg-green-950/75 border border-green-500/25 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-green-100 backdrop-blur-sm uppercase shadow-sm">
                    After V&V Service
                  </div>

                  {/* Slider Dividing Bar & Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white/90 cursor-ew-resize z-20 shadow-md flex items-center justify-center pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="w-9 h-9 rounded-full bg-primary-maroon border-2 border-white shadow-xl text-secondary-yellow flex items-center justify-center text-sm font-extrabold transition-transform group-hover:scale-105 duration-200">
                      ↔
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="calculator-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              {/* Left Side Controls (Inputs) */}
              <div className="lg:col-span-5 crm-card p-6 md:p-8 bg-white space-y-6">
                <div className="flex items-center gap-2.5 border-b border-border-subtle/50 pb-4">
                  <FiSliders className="text-primary-maroon w-5 h-5 shrink-0" />
                  <h3 className="text-base font-bold text-text-dark tracking-tight">Calculator Settings</h3>
                </div>

                {/* Star Rating Toggle */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-text-dark/50 uppercase tracking-wider block">AC Star Rating & Compressor</span>
                  <div className="grid grid-cols-2 gap-3.5">
                    <button
                      onClick={() => setAcType("3star")}
                      className={`py-3 px-4 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        acType === "3star"
                          ? "bg-primary-maroon/5 border-primary-maroon text-primary-maroon font-bold"
                          : "bg-bg-ivory border-border-subtle text-text-dark/65 hover:border-text-dark/25"
                      }`}
                    >
                      3-Star (Non-Inverter)
                    </button>
                    <button
                      onClick={() => setAcType("5star")}
                      className={`py-3 px-4 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        acType === "5star"
                          ? "bg-primary-maroon/5 border-primary-maroon text-primary-maroon font-bold"
                          : "bg-bg-ivory border-border-subtle text-text-dark/65 hover:border-text-dark/25"
                      }`}
                    >
                      5-Star (Inverter)
                    </button>
                  </div>
                </div>

                {/* Slider: Number of ACs */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-text-dark/50 uppercase tracking-wider">
                    <span>Number of ACs</span>
                    <span className="text-primary-maroon font-extrabold text-sm">{acUnits} {acUnits === 1 ? "Unit" : "Units"}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={acUnits}
                    onChange={(e) => setAcUnits(Number(e.target.value))}
                    className="w-full h-1.5 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary-maroon focus:outline-none"
                  />
                </div>

                {/* Slider: Daily Hours */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-text-dark/50 uppercase tracking-wider">
                    <span>Daily Run Time</span>
                    <span className="text-primary-maroon font-extrabold text-sm">{dailyHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(Number(e.target.value))}
                    className="w-full h-1.5 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary-maroon focus:outline-none"
                  />
                </div>

                {/* Slider: Usage Months */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-text-dark/50 uppercase tracking-wider">
                    <span>Usage Duration</span>
                    <span className="text-primary-maroon font-extrabold text-sm">{usageMonths} Months/Year</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={usageMonths}
                    onChange={(e) => setUsageMonths(Number(e.target.value))}
                    className="w-full h-1.5 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary-maroon focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Side Outputs */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Card: Power Saved */}
                <div className="crm-card p-6 bg-white flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-amber-500 mb-4">
                    <FiZap className="w-5 h-5 fill-amber-50" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">Estimated Power Saved</span>
                    <h4 className="text-3xl font-extrabold text-text-dark tracking-tight mt-1">
                      {powerSavedKWh.toLocaleString()} <span className="text-sm font-semibold text-text-dark/55">kWh/yr</span>
                    </h4>
                    <p className="text-[10px] text-text-dark/50 leading-relaxed font-light mt-2">
                      Servicing restores 20% efficiency otherwise lost to dirty fans, filters, and clogged condenser coils.
                    </p>
                  </div>
                </div>

                {/* Card: Money Saved */}
                <div className="crm-card p-6 bg-white border-l-4 border-l-primary-maroon flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/50 flex items-center justify-center text-primary-maroon mb-4">
                    <FiDollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">Electricity Cost Savings</span>
                    <h4 className="text-3xl font-extrabold text-primary-maroon tracking-tight mt-1">
                      ₹{moneySavedINR.toLocaleString()} <span className="text-sm font-semibold text-text-dark/55">/year</span>
                    </h4>
                    <p className="text-[10px] text-text-dark/50 leading-relaxed font-light mt-2">
                      Calculated at average regional tariff of ₹8 per unit (kWh). Directly lowers your monthly utility expenses.
                    </p>
                  </div>
                </div>

                {/* Card: Carbon Reduction */}
                <div className="crm-card p-6 bg-white flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/50 flex items-center justify-center text-green-600 mb-4">
                    <FaLeaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">CO2 Emissions Avoided</span>
                    <h4 className="text-3xl font-extrabold text-text-dark tracking-tight mt-1">
                      {co2AvoidedKg.toLocaleString()} <span className="text-sm font-semibold text-text-dark/55">kg CO2</span>
                    </h4>
                    <p className="text-[10px] text-text-dark/50 leading-relaxed font-light mt-2">
                      Equivalent to planting about {Math.round(co2AvoidedKg / 22)} trees annually by preventing grid electricity waste.
                    </p>
                  </div>
                </div>

                {/* Card: Lifespan Extension */}
                <div className="crm-card p-6 bg-white flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/50 flex items-center justify-center text-blue-500 mb-4">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">Lifespan Extension</span>
                    <h4 className="text-3xl font-extrabold text-text-dark tracking-tight mt-1">
                      +{lifespanExtension} <span className="text-sm font-semibold text-text-dark/55">{lifespanExtension === 1 ? "Year" : "Years"}</span>
                    </h4>
                    <p className="text-[10px] text-text-dark/50 leading-relaxed font-light mt-2">
                      Prevents high-load compressor failures, extending structural durability and postponing unit replacement costs.
                    </p>
                  </div>
                </div>

                {/* Booking Call-to-Action Link */}
                <div className="md:col-span-2 mt-2">
                  <a
                    href="#contact"
                    className="w-full bg-primary-maroon hover:bg-primary-maroon-dark text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl shadow-md shadow-primary-maroon/10 flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-[0.98]"
                  >
                    <span>Schedule Maintenance Service Now</span>
                    <FiArrowRight className="w-4 h-4 text-secondary-yellow font-extrabold" />
                  </a>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

export default InteractiveShowcaseSection;
