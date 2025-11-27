// src/pages/LegalNotice.jsx
import React from "react";

export default function LegalNotice() {
  return (
    <div
      className="min-h-screen bg-white py-12 px-4"
      style={{ fontFamily: "serif" }}
    >
      <div className="max-w-3xl mx-auto text-inkBlack">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Legal Notice & Disclaimer
        </h1>

        <p className="mb-4 text-sepia leading-relaxed">
          Earnalyzer is a budgeting tool designed for informational and
          educational purposes only.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          1. No Professional Advice
        </h2>
        <p className="mb-4 text-sepia leading-relaxed">
          Earnalyzer does not provide financial, legal, tax, or investment
          advice. All decisions you make based on the tool are your
          responsibility.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          2. No Liability
        </h2>
        <p className="mb-4 text-sepia leading-relaxed">
          We are not responsible for losses, miscalculations, or decisions made
          using the platform.
        </p>

        <h2
          className="text-xl font-semibold mt-8 mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          3. No Warranties
        </h2>
        <p className="mb-4 text-sepia leading-relaxed">
          All information provided by the tool is offered "as is" with no
          warranty regarding accuracy, performance, or outcomes.
        </p>

        <p className="mt-12 text-sm text-sepia">Last Updated: 2025</p>
      </div>
    </div>
  );
}
