import React from "react";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import ServicesSection from "./ServicesSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import ServiceProcessSection from "./ServiceProcessSection";
import BeforeAfterSection from "./BeforeAfterSection";
import TestimonialSection from "./TestimonialSection";
import ContactSection from "./ContactSection";

const Home = () => {
  return (
    <main className="relative w-full">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ServiceProcessSection />
      <BeforeAfterSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
};

export default Home;
