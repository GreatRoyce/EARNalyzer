// src/pages/About.jsx
import React from "react";

export default function About() {
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
          About Earnalyzer
        </h1>

        <div className="space-y-4 text-sepia">
          <p>
            Earnalyzer was created to give people a simple, fast, and clear way
            to understand where their money goes.
          </p>

          <p>
            Many budgeting apps require users to connect their bank accounts,
            share personal information, and go through long onboarding steps.
            Earnalyzer is different. It focuses only on helping you visualize
            your income as added.
          </p>
        </div>

        <h2
          className="text-xl font-semibold mt-8 mb-3"
          style={{ fontFamily: "Georgia, serif", color: "#2A1B0D" }}
        >
          Our Philosophy
        </h2>
        <p className="text-sepia">
          Privacy first. Simplicity first. You should be able to understand your
          finances without sacrificing your data.
        </p>
        <p className="mb-4">
          Just enter your numbers and see your financial picture instantly.
        </p>
      </div>
    </div>
  );
}
