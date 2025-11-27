// src/components/LandingPage/CTASection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 px-4 bg-agedPaper">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="bg-parchment border border-forestGreen rounded-xl p-8 sm:p-12 mx-4"
          style={{
            borderWidth: "3px",
            boxShadow: "10px 10px 0px rgba(42, 27, 13, 0.1)",
          }}
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-inkBlack mb-4 sm:mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ready to illuminate your financial path?
          </h2>
          <button
            onClick={() => navigate("/signup")}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-forestGreen text-parchment font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
            style={{ fontFamily: "serif", border: "2px solid #2A1B0D" }}
          >
            Inscribe Your Name & Begin
            <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;