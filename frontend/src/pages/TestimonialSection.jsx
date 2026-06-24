import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner",
    text: "The technician arrived on time and fixed my AC within an hour. Professional service with a transparent upfront quote.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Local Business Owner",
    text: "Used their service for my shop's deep freezer. Extremely reliable and the 90-day warranty gave me absolute peace of mind.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Arun M.",
    role: "Resident",
    text: "Quick response for washing machine repair. They brought original spare parts and completed it perfectly. Highly recommended.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-bg-ivory relative z-10 max-w-7xl mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-secondary-yellow mb-3 bg-secondary-yellow/10 px-4 py-1.5 rounded-full border border-secondary-yellow/20">
          Client Reviews
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          Trusted by <span className="text-gradient">Thousands</span>
        </h2>
        <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
          Don't just take our word for it. Here is what our satisfied customers have to say about our premium repair service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="premium-card p-8 flex flex-col h-full relative"
          >
            <div className="flex gap-1 mb-6 text-secondary-yellow">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={`w-4 h-4 ${i < testimonial.rating ? "fill-current" : "opacity-30"}`} />
              ))}
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-8 font-light italic flex-grow">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
              <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-white/10 object-cover" />
              <div>
                <h4 className="text-white font-bold text-sm tracking-tight">{testimonial.name}</h4>
                <p className="text-white/40 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
