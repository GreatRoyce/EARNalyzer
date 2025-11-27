// src/components/LandingPage/LandingPage.jsx
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import ChartsSection from "./ChartsSection";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";
import Footer from "./Footer";
import parch from '../../assets/parch.jpg';

function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4); // 4 features
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen font-serif relative" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Background with subtle blur */}
      <div 
        className="fixed inset-0 z-0 bg-parchment"
        style={{
          backgroundImage: `url(${parch})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'blur(6px) opacity(0.6)', // Very subtle blur with opacity
        }}
      />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="fixed inset-0 z-0 bg-parchment/20" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <HeroSection />
        <FeaturesSection
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
        />
        <ChartsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;