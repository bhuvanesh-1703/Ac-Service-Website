import React, { useState } from "react";
import { FiZap, FiDollarSign, FiClock } from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

const SavingsCalculatorSection = () => {
  // Simple state variables for calculator settings
  const [acUnits, setAcUnits] = useState(2); // Number of AC units (1 to 5)
  const [dailyHours, setDailyHours] = useState(8); // Daily run-time hours (2 to 24)
  const [usageMonths, setUsageMonths] = useState(6); // Months of usage per year (1 to 12)
  const [isFiveStar, setIsFiveStar] = useState(false); // true if 5-star AC (efficient), false if 3-star AC (standard)

  // Calculations:
  // 1. Determine hourly power consumption of the AC (in kW)
  let hourlyKW = 1.5; // standard 3-star AC uses ~1.5 kW
  if (isFiveStar) {
    hourlyKW = 1.0; // efficient 5-star AC uses ~1.0 kW
  }

  // 2. Total active operational days per year
  const usageDaysPerYear = usageMonths * 30;

  // 3. Normal yearly power consumption of the units (in kWh)
  const normalYearlyKWh = acUnits * dailyHours * usageDaysPerYear * hourlyKW;

  // 4. Dirty filters and coils waste about 20% extra energy.
  // Regular service saves/restores this 20% waste.
  const powerSavedKWh = Math.round(normalYearlyKWh * 0.20);

  // 5. Money saved in Rupees (assumes ₹8 per unit/kWh)
  const moneySavedINR = powerSavedKWh * 8;

  // 6. CO2 emission reduction (approx 0.82 kg CO2 saved per kWh)
  const co2SavedKg = Math.round(powerSavedKWh * 0.82);

  // 7. Estimated lifespan extension (years)
  let lifespanYears = 2;
  if (dailyHours > 12) {
    lifespanYears = 4; // heavy usage benefits more from regular maintenance
  } else if (dailyHours > 6) {
    lifespanYears = 3;
  }

  return (
    <section id="savings-calculator" className="py-20 bg-bg-ivory max-w-7xl mx-auto px-6 font-sans">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-2 bg-primary-maroon/5 px-3 py-1 rounded-full">
          Bill Savings
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
          AC Maintenance <span className="text-primary-maroon">Savings Calculator</span>
        </h2>
        <p className="text-sm text-text-dark/60">
          Calculate your annual electricity bill reduction and AC lifespan extension when getting regular cleaning services.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-4 rounded-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Inputs / Settings */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-border-subtle shadow-sm space-y-6">
          <h3 className="text-base font-bold text-text-dark border-b border-border-subtle/50 pb-3">
            Adjust Your AC Settings
          </h3>

          {/* AC Model Star Rating Selection */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-dark/50 uppercase tracking-wider block">
              AC Efficiency Type
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsFiveStar(false)}
                className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !isFiveStar
                    ? "bg-primary-maroon text-white border-primary-maroon"
                    : "bg-bg-ivory border-border-subtle text-text-dark/70 hover:border-text-dark"
                }`}
              >
                3-Star AC (Standard)
              </button>
              <button
                type="button"
                onClick={() => setIsFiveStar(true)}
                className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isFiveStar
                    ? "bg-primary-maroon text-white border-primary-maroon"
                    : "bg-bg-ivory border-border-subtle text-text-dark/70 hover:border-text-dark"
                }`}
              >
                5-Star AC (Inverter)
              </button>
            </div>
          </div>

          {/* Slider for AC Units */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-text-dark/50 uppercase text-[10px]">Number of ACs</span>
              <span className="text-primary-maroon">{acUnits} {acUnits === 1 ? "Unit" : "Units"}</span>
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

          {/* Slider for Daily Hours */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-text-dark/50 uppercase text-[10px]">Daily Runtime</span>
              <span className="text-primary-maroon">{dailyHours} Hours/Day</span>
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

          {/* Slider for Months */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-text-dark/50 uppercase text-[10px]">Months Used Per Year</span>
              <span className="text-primary-maroon">{usageMonths} Months</span>
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

        {/* Right Side: Calculated Savings Outputs */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card: Power saved */}
          <div className="bg-white h-90 p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/50 flex items-center justify-center text-amber-500 mb-4">
              <FiZap className="w-5 h-5 fill-amber-50" />
            </div>
            <div className="pb-12">
              <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">Power Saved</span>
              <h4 className="text-2xl font-extrabold text-text-dark tracking-tight mt-1">
                {powerSavedKWh.toLocaleString()} <span className="text-xs font-semibold text-text-dark/55">kWh / year</span>
              </h4>
              <p className="text-[10px] text-text-dark/50 leading-relaxed font-light mt-1.5">
                Restoring AC efficiency prevents electricity wastage from dusty components.
              </p>
            </div>
          </div>

          {/* Card: Money saved */}
          <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-sm border-l-4 border-l-primary-maroon flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/50 flex items-center justify-center text-primary-maroon mb-4">
              <FiDollarSign className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-text-dark/45 font-bold uppercase tracking-wider block">Estimated Cost Saved</span>
              <h4 className="text-2xl font-extrabold text-primary-maroon tracking-tight mt-1">
                ₹{moneySavedINR.toLocaleString()} <span className="text-xs font-semibold text-text-dark/55">/ year</span>
              </h4>
              <p className="text-[10px] text-text-dark/50 leading-relaxed font-light mt-1.5">
                Calculated at an average electricity tariff rate of ₹8 per unit.
              </p>
            </div>
          </div>

          

        
        </div>

      </div>
    </section>
  );
};

export default SavingsCalculatorSection;
