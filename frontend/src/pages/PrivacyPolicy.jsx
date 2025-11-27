// src/pages/PrivacyPolicy.jsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-inkBlack">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. Earnalyzer is designed to help you
        understand your finances without collecting or storing personal data.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. No Data Collection</h2>
      <p className="mb-4">
        We do not collect, store, or save your income, expenses, or any
        financial information. Everything you enter stays on your device.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. No Connection to Bank Accounts
      </h2>
      <p className="mb-4">
        Earnalyzer has no access to your bank accounts, balances, or
        transactions. We are not connected to any financial institution.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        3. No Third-Party Involvement
      </h2>
      <p className="mb-4">
        We do not share your information with any third parties. No analytics,
        trackers, or external services monitor your entries.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Your Control</h2>
      <p className="mb-4">
        Only you can see the numbers you enter. All calculations happen directly
        in your browser.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Changes</h2>
      <p className="mb-4">
        If this policy is updated, the new version will be posted here.
      </p>

      <p className="mt-12 text-sm text-sepia">Last Updated: 2025</p>
    </div>
  );
}
