// src/pages/FAQ.jsx
import React from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "Do I need to create an account?",
      a: "No. Earnalyzer works with zero accounts, zero logins, and zero data collection.",
    },
    {
      q: "Do you store my income or expenses?",
      a: "No. Everything you enter stays on your device. We do not save any information.",
    },
    {
      q: "Do you connect to my bank?",
      a: "No. Earnalyzer cannot see your bank accounts or transactions.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. You are the only one who has access to your data since it stays on your device.",
    },
    {
      q: "Is Earnalyzer free?",
      a: "Yes. The core budgeting tool is completely free to use.",
    },
    {
      q: "Can I use Earnalyzer on my phone?",
      a: "Yes. Earnalyzer is designed to work on both desktop and mobile browsers.",
    },
    {
      q: "How often is Earnalyzer updated?",
      a: "We regularly update Earnalyzer to improve performance and add new features based on user feedback.",
    },
    {
      q: "Who can I contact for support?",
      a: "You can reach us at earnalyzer@gmail.com.",
    },
    {
      q: "Where can I find your privacy policy?",
      a: "You can view all our policies on the Policies page linked in the footer.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4" style={{ fontFamily: "serif" }}>
      <div className="max-w-3xl mx-auto text-inkBlack">
        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "Georgia, serif" }}>
          Frequently Asked Questions
        </h1>

        <div className="space-y-8">
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-charcoal/20 pb-6 last:border-b-0">
              <h2 
                className="text-xl font-semibold mb-3" 
                style={{ fontFamily: "Georgia, serif", color: "#2A1B0D" }}
              >
                {item.q}
              </h2>
              <p className="text-sepia leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}