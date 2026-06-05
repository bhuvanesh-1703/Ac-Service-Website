import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const AnimatedCounter = ({ value, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse the number from strings like "5000" or "3000"
    const target = parseInt(value, 10);
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
