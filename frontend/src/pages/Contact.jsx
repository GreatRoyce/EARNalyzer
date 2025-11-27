// src/pages/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white py-12 px-4" style={{ fontFamily: "serif" }}>
      <div className="max-w-3xl mx-auto text-inkBlack">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Georgia, serif" }}>
          Contact Us
        </h1>

        <p className="mb-4 text-sepia">
          If you have questions, feedback, or need support, you can reach us
          anytime.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3" style={{ fontFamily: "Georgia, serif" }}>
          Support Email
        </h2>
        <p className="mb-4">
          <a
            href="mailto:earnalyzer@gmail.com?subject=Support%20Request&body=Hi,%0D%0AI%20need%20help%20with..."
            className="text-blue-600 underline hover:text-green-800 transition-colors"
          >
            earnalyzer@gmail.com
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3" style={{ fontFamily: "Georgia, serif" }}>
          Response Time
        </h2>
        <p className="mb-4 text-sepia">
          We aim to respond within 24–48 hours.
        </p>

        <p className="mt-12 text-sm text-sepia">Thank you for using Earnalyzer.</p>
      </div>
    </div>
  );
}