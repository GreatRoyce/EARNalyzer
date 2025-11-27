// src/components/LandingPage/FeaturesSection.jsx
import React from "react";
import { FiEye, FiCpu, FiClock, FiShield } from "react-icons/fi";

function FeaturesSection({ setActiveFeature }) {
  const features = [
    {
      icon: FiEye,
      title: "Visualize Spending",
      description:
        "See your finances as illuminations and diagrams. No more guessing.",
      color: "crimson",
    },
    {
      icon: FiCpu,
      title: "Scribe's Insights",
      description:
        "Receive wise counsel about your spending habits. 'You spent 30% more on feasting this month.'",
      color: "deepBlue",
    },
    {
      icon: FiClock,
      title: "Season-Based Tracking",
      description:
        "Track expenses against specific harvest periods or royal grants for true financial clarity.",
      color: "forestGreen",
    },
    {
      icon: FiShield,
      title: "Private & Simple",
      description:
        "Your ledger remains in your hands. Record transactions without revealing to the crown. Simple, secure, and true.",
      color: "burntUmber",
    },
  ];

  const colorClasses = {
    crimson: {
      bg: "bg-[#DC143C]",
      text: "text-[#DC143C]",
      lightBg: "bg-[#DC143C]/10",
      border: "border-[#DC143C]/30",
    },
    deepBlue: {
      bg: "bg-[#1E3A8A]",
      text: "text-[#1E3A8A]",
      lightBg: "bg-[#1E3A8A]/10",
      border: "border-[#1E3A8A]/30",
    },
    forestGreen: {
      bg: "bg-[#228B22]",
      text: "text-[#228B22]",
      lightBg: "bg-[#228B22]/10",
      border: "border-[#228B22]/30",
    },
    burntUmber: {
      bg: "bg-[#8A3324]",
      text: "text-[#8A3324]",
      lightBg: "bg-[#8A3324]/10",
      border: "border-[#8A3324]/30",
    },
  };

  return (
    <section className="py-10 sm:py-16 px-4 bg-agedPaper">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div
            className="bg-parchment border border-forestGreen rounded-xl p-2 sm:p-4 inline-block mx-4"
            
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-inkBlack mb-2 mt-10"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Command Your Treasury
            </h2>
            <p
              className="text-base sm:text-lg text-sepia max-w-2xl mx-auto"
              style={{ fontFamily: "serif" }}
            >
              Ancient methods adapted for modern financial clarity
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClass = colorClasses[feature.color];
            return (
              <div
                key={feature.title}
                className="bg-parchment border border-charcoal rounded-xl p-4 sm:p-6 hover:border-forestGreen transition-all duration-300 group"
                style={{
                  borderWidth: "2px",
                  boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`mb-3 sm:mb-4 inline-flex rounded-lg ${colorClass.lightBg} border ${colorClass.border} p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300`}
                  style={{ borderWidth: "2px" }}
                >
                  <Icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${colorClass.text}`}
                  />
                </div>
                <h3
                  className={`text-lg sm:text-xl font-semibold ${colorClass.text} mb-2`}
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sepia text-sm sm:text-base leading-relaxed"
                  style={{ fontFamily: "serif" }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;