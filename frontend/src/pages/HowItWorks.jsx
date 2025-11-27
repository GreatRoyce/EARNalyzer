// src/pages/HowItWorks.jsx
import React from "react";

export default function HowItWorks() {
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
          How It Works
        </h1>

        <ol className="space-y-6 list-decimal pl-6">
          <li className="pb-4 border-b border-charcoal/20 last:border-b-0">
            <strong className="text-inkBlack">Enter your income.</strong>
            <span className="text-sepia block mt-1">
              This is the total amount you earn over a chosen period.
            </span>
          </li>

          <li className="pb-4 border-b border-charcoal/20 last:border-b-0">
            <strong className="text-inkBlack">Enter your expenses.</strong>
            <span className="text-sepia block mt-1">
              Add categories such as food, bills, transport, rent, and savings.
            </span>
          </li>

          <li className="pb-4 border-b border-charcoal/20 last:border-b-0">
            <strong className="text-inkBlack">
              Earnalyzer calculates everything.
            </strong>
            <span className="text-sepia block mt-1">
              You instantly get a breakdown showing how your money is
              distributed.
            </span>
          </li>

          <li className="pb-4 border-b border-charcoal/20 last:border-b-0">
            <strong className="text-inkBlack">See charts and diagrams.</strong>
            <span className="text-sepia block mt-1">
              Visual graphs help you see where most of your money goes.
            </span>
          </li>

          <li className="pb-4">
            <strong className="text-inkBlack">No data is stored.</strong>
            <span className="text-sepia block mt-1">
              All calculations happen on your device.
            </span>
          </li>
        </ol>

        <p className="mt-8 text-sepia leading-relaxed">
          Earnalyzer is free, simple, and private — helping you make sense of
          your financial habits without complexity.
        </p>
      </div>
    </div>
  );
}
