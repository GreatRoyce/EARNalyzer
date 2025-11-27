// src/components/LandingPage/TestimonialsSection.jsx
import React from "react";

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-4 bg-parchment border-t border-charcoal"
      style={{ borderTopWidth: "3px" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <div
            className="bg-agedPaper border border-burntUmber rounded-xl p-6 sm:p-8 mx-4"
            style={{
              borderWidth: "3px",
              boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <p
              className="text-lg sm:text-xl italic text-sepia mb-4 sm:mb-6 leading-relaxed"
              style={{ fontFamily: "serif" }}
            >
              "I was astonished to see my ale expenditures in the circular
              diagram. Earnalyzer helped me save 100 gold pieces monthly
              without forsaking comfort."
            </p>
            <p
              className="text-forestGreen font-semibold text-base sm:text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              — Ifunanya K.,
            </p>
          </div>
          <p
            className="mt-6 sm:mt-8 text-sepia bg-agedPaper rounded-lg p-4 border border-charcoal mx-4"
            style={{ fontFamily: "serif", borderWidth: "2px" }}
          >
            Trusted by thousands of scholars to command their treasury.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;