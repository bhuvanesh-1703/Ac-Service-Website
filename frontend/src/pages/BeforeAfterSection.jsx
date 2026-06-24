import React, { useState } from "react";

// Import images
import filterBefore from "../assets/showcase_filter_before.png";
import filterAfter from "../assets/showcase_filter_after.png";
import coilsBefore from "../assets/showcase_coils_before.png";
import coilsAfter from "../assets/showcase_coils_after.png";
import wiringBefore from "../assets/showcase_wiring_before.png";
import wiringAfter from "../assets/showcase_wiring_after.png";

const BeforeAfterSection = () => {
  // Simple state to track which case is selected: "filter", "coils", or "wiring"
  const [activeCase, setActiveCase] = useState("filter");
  
  // Simple state to track the position of the comparison slider (from 0 to 100)
  const [sliderPos, setSliderPos] = useState(50);

  // Get current images based on which button is clicked
  let beforeImg = filterBefore;
  let afterImg = filterAfter;
  let title = "Air Filter Cleaning";
  let desc = "Clogged and dusty air filters block airflow, making your AC work twice as hard. We deep clean the filters to restore fresh air and efficiency.";
  let beforeLabel = "Dirty Dusty Filter";
  let afterLabel = "Clean Sanitized Filter";

  if (activeCase === "coils") {
    beforeImg = coilsBefore;
    afterImg = coilsAfter;
    title = "Condenser Coil Cleaning";
    desc = "Outdoor units gather dirt, preventing heat release and lowering cooling capacity. Our chemical wash cleans the coils to restore 100% cooling power.";
    beforeLabel = "Grimy Outdoor Coils";
    afterLabel = "Chemical Washed Coils";
  } else if (activeCase === "wiring") {
    beforeImg = wiringBefore;
    afterImg = wiringAfter;
    title = "Electrical Terminal Repair";
    desc = "Burnt or loose wiring connections cause high power usage or total compressor breakdown. We rewire terminals safely with protective covers.";
    beforeLabel = "Oxidized Burnt Terminal";
    afterLabel = "Secure Labeled Wiring";
  }

  return (
    <section id="work-showcase" className="py-20 bg-bg-ivory max-w-7xl mx-auto px-6 font-sans">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-2 bg-primary-maroon/5 px-3 py-1 rounded-full">
          Quality Checks
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4">
          Interactive <span className="text-primary-maroon">Before & After</span> Results
        </h2>
        <p className="text-sm text-text-dark/60">
          See the actual difference our professional appliance servicing makes. Choose a category and drag the slider handle.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-4 rounded-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Buttons and Information */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick tab switch buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveCase("filter");
                setSliderPos(50);
              }}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCase === "filter"
                  ? "bg-primary-maroon text-white border-primary-maroon"
                  : "bg-card-bg border-border-subtle text-text-dark/70 hover:border-text-dark"
              }`}
            >
              Filter Service
            </button>
            <button
              onClick={() => {
                setActiveCase("coils");
                setSliderPos(50);
              }}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCase === "coils"
                  ? "bg-primary-maroon text-white border-primary-maroon"
                  : "bg-card-bg border-border-subtle text-text-dark/70 hover:border-text-dark"
              }`}
            >
              Coil Wash
            </button>
            <button
              onClick={() => {
                setActiveCase("wiring");
                setSliderPos(50);
              }}
              className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCase === "wiring"
                  ? "bg-primary-maroon text-white border-primary-maroon"
                  : "bg-card-bg border-border-subtle text-text-dark/70 hover:border-text-dark"
              }`}
            >
              Wiring Repair
            </button>
          </div>

          {/* Details Card */}
          <div className="crm-card p-6 bg-card-bg border border-border-subtle shadow-sm space-y-4">
            <h3 className="text-lg font-extrabold text-text-dark tracking-tight">{title}</h3>
            <p className="text-xs md:text-sm text-text-dark/65 leading-relaxed font-light">{desc}</p>
            
            <div className="border-t border-border-subtle/70 pt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold shrink-0">✕</span>
                <span><span className="font-bold text-red-800">Before:</span> {beforeLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0">✓</span>
                <span><span className="font-bold text-green-800">After:</span> {afterLabel}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-text-dark/50 italic">
            💡 Drag your finger or mouse cursor anywhere on the image to compare.
          </p>
        </div>

        {/* Right Side: Simple range overlay slider */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full aspect-[4/3] max-w-[600px] bg-card-bg border border-border-subtle rounded-3xl overflow-hidden shadow-md select-none">
            
            {/* 1. Before Image (Background) */}
            <img
              src={beforeImg}
              alt="Before Service"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 z-10 bg-red-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
              Before
            </div>

            {/* 2. After Image (Revealed based on slider position) */}
            <img
              src={afterImg}
              alt="After Service"
              className="absolute inset-0 w-full h-full object-cover z-10"
              style={{
                clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)`,
              }}
            />
            <div className="absolute bottom-4 right-4 z-20 bg-green-900/80 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider">
              After V&V
            </div>

            {/* 3. Visual Slider Line and Floating Drag Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-maroon border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
                ↔
              </div>
            </div>

            {/* 4. Native HTML input range overlay (invisible, handles all drags/touches) */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize"
            />

          </div>
        </div>

      </div>
    </section>
  );
};

export default BeforeAfterSection;
