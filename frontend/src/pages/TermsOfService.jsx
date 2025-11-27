// src/pages/TermsOfService.jsx
import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-inkBlack">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        By using Earnalyzer, you agree to the following terms. These terms are
        designed to be simple because the product itself is simple.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Purpose</h2>
      <p className="mb-4">
        Earnalyzer is a budgeting tool that provides calculations and spending
        diagrams based on the values you enter. It is intended for educational
        and personal-planning use only.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. No Financial Advice</h2>
      <p className="mb-4">
        Earnalyzer does not give financial, legal, or investment advice. All
        decisions you make based on the tool are your responsibility.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. No Liability</h2>
      <p className="mb-4">
        We are not responsible for financial losses, miscalculations, or
        decisions made using this tool.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. User Responsibility</h2>
      <p className="mb-4">
        You are responsible for the accuracy of the values you enter and for how
        you use the results.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Changes</h2>
      <p className="mb-4">
        We may update these terms at any time. Continued use of Earnalyzer means
        you accept the updated terms.
      </p>

      <p className="mt-12 text-sm text-sepia">Last Updated: 2024</p>
    </div>
  );
}
