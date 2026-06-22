import React from "react";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import ServicesSection from "./ServicesSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import ServiceProcessSection from "./ServiceProcessSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";

const Home = () => {
  return (
    <main className="relative w-full">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ServiceProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
};

export default Home;
