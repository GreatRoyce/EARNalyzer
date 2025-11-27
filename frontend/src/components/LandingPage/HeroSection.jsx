// src/components/LandingPage/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function HeroSection() {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const rotatingWords = [
    "Effortlessly.",
    "Seamlessly.",
    "Automatically.",
    "Smartly.",
    "With Clarity.",
    "Hassle-Free.",
  ];

  const stats = [
    { number: "50K+", label: "Faithful Users" },
    { number: "2.1M+", label: "Tracked Treasure" },
    { number: "4.8/5", label: "Scholar Rating" },
    { number: "100%", label: "Private Records" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsTyping(true);
      }, 800); // Increased pause before typing next word
    }, 4500); // Increased from 3000ms to 4500ms to account for slower animations

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 relative overflow-hidden pt-32">
      {/* Aged paper texture */}
      <div className="absolute inset-0 bg-parchment opacity-90"></div>

      {/* Ink splatters and stains */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-sepia rounded-full opacity-10 hidden sm:block"></div>
      <div className="absolute bottom-40 left-8 w-24 h-24 bg-sepia rounded-full opacity-15 hidden sm:block"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-burntUmber rounded-full opacity-20 hidden sm:block"></div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Main Heading */}
        <div className="mb-8">
          <div className="flex flex-col items-center">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-inkBlack leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Know Your Money.
            </h1>
            <div className="typing-container min-h-[1.2em] mt-2 sm:mt-4">
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold typing-text ${
                  isTyping ? "typing" : "erasing"
                }`}
                style={{
                  fontFamily: "Georgia, serif",
                  color: "#8B0000", // crimson
                }}
              >
                {rotatingWords[currentWordIndex]}
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg lg:text-xl text-sepia mb-8 max-w-2xl mx-auto leading-relaxed px-4 mt-6"
            style={{ fontFamily: "serif", fontStyle: "italic" }}
          >
            Earnalyzer transforms your raw spending into clear visuals and
            powerful insights. Just enter, tag, and understand.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
          <button
            onClick={() => navigate("/signup")}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-forestGreen text-parchment font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            style={{ fontFamily: "serif", border: "2px solid #2A1B0D" }}
          >
            Begin Your Ledger
            <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-transparent border border-[#8B0000] text-deepBlue rounded-xl font-semibold hover:bg-deepBlue/5 hover:border-black/90 transition-all duration-300  hover:text-[#8B0000]"
            style={{ fontFamily: "serif", borderWidth: "2px" }}
          >
            Login
          </button>
        </div>

        {/* Stats */}
        <div
          className="bg-agedPaper border border-charcoal rounded-xl mt-6 sm:mt-12 p-6 sm:p-8 mb-12 mx-4"
          style={{
            borderWidth: "3px",
            boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-inkBlack"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs sm:text-sm text-sepia"
                  style={{ fontFamily: "serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div
          className="w-6 h-10 border-2 border-forestGreen rounded-full flex justify-center"
          style={{ borderWidth: "2px" }}
        >
          <div className="w-1 h-3 bg-forestGreen rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
