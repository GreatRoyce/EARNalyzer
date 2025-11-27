// src/pages/CombinedPolicies.jsx
import React from "react";

export default function CombinedPolicies() {
  return (
    <div className="min-h-screen bg-white py-12 px-4" style={{ fontFamily: "serif" }}>
      <div className="max-w-3xl mx-auto text-inkBlack">
        <h1 className="text-3xl font-bold mb-10" style={{ fontFamily: "Georgia, serif" }}>
          Policies & Information
        </h1>

        {/* PRIVACY */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Privacy Policy</h2>
          <p className="text-sepia leading-relaxed">
            Earnalyzer does not collect, store, or share your personal data.
            Everything you enter stays on your device only.
          </p>
        </section>

        {/* TERMS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Terms of Service</h2>
          <p className="text-sepia leading-relaxed">
            Earnalyzer is a budgeting tool for personal and educational use. It
            does not provide financial or legal advice, and all decisions based on
            the tool are your responsibility.
          </p>
        </section>

        {/* SECURITY */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Security</h2>
          <p className="text-sepia leading-relaxed">
            All calculations occur locally in your browser. No external servers,
            accounts, or third parties are involved.
          </p>
        </section>

        {/* COOKIE POLICY */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>Cookie Policy</h2>
          <p className="text-sepia leading-relaxed">
            Earnalyzer does not use cookies, trackers, analytics, or advertising
            technologies.
          </p>
        </section>


        <p className="mt-12 text-sm text-sepia">Last Updated: 2025</p>
      </div>
    </div>
  );
}