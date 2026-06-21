import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonialsData = [
  {
    name: "Rahul Sharma",
    role: "Homeowner, Rohini",
    review: "My split AC stopped cooling in the peak of summer. V&V Services dispatched a technician within 2 hours. He quickly found a capacitor issue and resolved it on the spot. Fantastic speed and service!",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Cafe Owner, Dwarka",
    review: "Our commercial refrigerator started leaking water and losing cooling. The technician diagnosed a clogged defrost drain and fixed it professionally. Excellent expertise and very honest pricing.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "IT Professional, Noida",
    review: "Our front-load washing machine was making loud vibrating noises during spin cycles. The service engineer replaced the worn-out suspension springs. It works quiet now. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    role: "Homemaker, Janakpuri",
    review: "Got my RO purifier fully serviced. The technician replaced the filters, cleaned the tank, and balanced the TDS. The water taste is perfect now. Prompt, clean, and professional work.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="testimonials" className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary-maroon mb-3 bg-primary-maroon/5 px-3 py-1 rounded-full border border-primary-maroon/10">
          Reviews
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark mb-4">
          What Our Happy <span className="text-primary-maroon">Clients Say</span>
        </h2>
        <p className="text-sm sm:text-base text-text-dark/60 font-light leading-relaxed">
          Read direct feedback from local homeowners and business owners who have experienced our prompt and professional appliance repairs.
        </p>
        <div className="h-1 w-12 bg-secondary-yellow mt-6 rounded-full mx-auto" />
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {testimonialsData.map((t, index) => (
          <motion.div
            key={index}
            className="crm-card p-6 md:p-8 bg-white relative flex flex-col justify-between h-full"
            variants={itemVariants}
          >
            {/* Decorative Quote Mark */}
            <span className="absolute -top-3 right-3 text-7xl font-serif text-primary-maroon/5 pointer-events-none select-none">
              &ldquo;
            </span>

            <div>
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-3.5 h-3.5 ${i < t.rating ? "text-amber-500 fill-amber-500" : "text-border-subtle fill-border-subtle"}`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs text-text-dark/75 leading-relaxed font-light italic mb-6">
                &ldquo;{t.review}&rdquo;
              </p>
            </div>

            {/* Author Profile */}
            <div className="flex items-center gap-3 pt-3 border-t border-border-subtle/50 mt-auto">
              <div className="w-8.5 h-8.5 rounded-full bg-primary-maroon text-white font-black text-xs flex items-center justify-center">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-text-dark">{t.name}</h4>
                <span className="text-[10px] text-primary-maroon font-semibold block mt-0.5">{t.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
