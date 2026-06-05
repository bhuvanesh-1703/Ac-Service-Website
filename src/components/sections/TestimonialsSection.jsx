import React from "react";
import SectionHeader from "../ui/SectionHeader";
import TestimonialCard from "../ui/TestimonialCard";

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
    review: "Our front-load washing machine was making loud vibrating noises during spin cycles. The service engineer replaced the worn-out suspension springs. It works as quiet as new now. Highly recommended!",
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
  return (
    <section id="testimonials" className="py-24 relative z-10 max-w-7xl mx-auto px-6">
      <SectionHeader
        eyebrow="Reviews"
        title="What Our Happy"
        highlightTitle="Clients Say"
        subtitle="Read feedback from local homeowners and business owners who have experienced our prompt and professional appliance repairs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonialsData.map((t, index) => (
          <TestimonialCard
            key={index}
            index={index}
            name={t.name}
            role={t.role}
            review={t.review}
            rating={t.rating}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
