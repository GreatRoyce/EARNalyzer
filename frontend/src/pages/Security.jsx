// src/pages/Security.jsx
import React from "react";

export default function Security() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-inkBlack">
      <h1 className="text-3xl font-bold mb-6">Security</h1>

      <p className="mb-4">
        At Earnalyzer, your security and privacy are built directly into how the
        tool works. Because we don’t store your data or connect to financial
        accounts, the risk of exposure is extremely low.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. No Data Storage</h2>
      <p className="mb-4">
        All calculations happen in your browser. Nothing you enter is sent to a
        server, saved in a database, or transmitted anywhere. When you refresh
        your browser, the data disappears.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        2. No External Account Access
      </h2>
      <p className="mb-4">
        Earnalyzer does not request or access login details, bank accounts, or
        financial APIs. Your real financial information remains untouched.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Local Processing</h2>
      <p className="mb-4">
        All income and expense values are processed locally on your device.
        Nothing is uploaded or stored on a remote server.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        4. No Tracking or Profiling
      </h2>
      <p className="mb-4">
        We do not use tracking scripts, cookies, analytics tools, or fingerprint
        technologies that monitor your behavior or store your personal
        information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Secure by Design</h2>
      <p className="mb-4">
        The safest data is the data that never leaves your device. By design,
        Earnalyzer reduces risk by minimizing what is collected — in this case,
        nothing at all.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Your Responsibility</h2>
      <p className="mb-4">
        If you choose to save or export your results, ensure they are stored
        securely on your device. We cannot access or recover any of your saved
        data.
      </p>

      <p className="mt-12 text-sm text-sepia">Last Updated: 2025</p>
    </div>
  );
}
