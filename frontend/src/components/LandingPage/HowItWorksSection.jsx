// src/components/LandingPage/HowItWorksSection.jsx
import React from "react";

function HowItWorksSection() {
  const howItWorks = [
    {
      step: 1,
      title: "Begin Your Ledger",
      description:
        "Record your income for a season (like a harvest moon or royal grant).",
    },
    {
      step: 2,
      title: "Mark Your Expenses",
      description:
        "Inscribe each expenditure and categorize it in your financial scroll.",
    },
    {
      step: 3,
      title: "Study & Conclude",
      description:
        "Watch your illuminations take form. Create a finished manuscript when the season ends.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 px-4 bg-agedPaper border-t border-laserPink/20"
      style={{ borderTopWidth: "3px" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div
            className="bg-parchment border border-crimson rounded-xl p-6 sm:p-8 inline-block mx-4"
            style={{
              borderWidth: "3px",
              boxShadow: "8px 8px 0px rgba(139, 0, 0, 0.1)",
            }}
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-inkBlack mb-4"
              style={{ fontFamily: "Georgia, serif" }}
            >
              The Ancient Method
            </h2>
            <p
              className="text-base sm:text-lg text-sepia"
              style={{ fontFamily: "serif" }}
            >
              Three sacred steps to financial enlightenment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <div
              key={index}
              className="relative text-center group border-2 border-terminalAmber/20 p-6 rounded-2xl"
            >
              <div
                className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-forestGreen/10 border border-forestGreen text-forestGreen text-lg sm:text-xl font-bold group-hover:scale-110 transition-transform duration-300"
                style={{ borderWidth: "2px", fontFamily: "Georgia, serif" }}
              >
                {step.step}
              </div>
              <h3
                className="text-lg sm:text-xl font-semibold text-inkBlack mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sepia text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: "serif" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;