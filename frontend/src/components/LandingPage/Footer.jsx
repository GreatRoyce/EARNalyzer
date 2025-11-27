// src/components/LandingPage/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer
      className="bg-parchment text-inkBlack py-12 px-4 border-t border-charcoal"
      style={{ borderTopWidth: "3px", fontFamily: "serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Branding */}
          <div>
            <h3
              className="text-xl font-bold text-inkBlack mb-4"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Earnalyzer
            </h3>
            <p className="text-sepia text-sm sm:text-base">
              Simple budget analysis and spending insights.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4
              className="font-semibold mb-3 sm:mb-4 text-inkBlack text-base sm:text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Product
            </h4>
            <ul className="space-y-2 text-sepia text-sm sm:text-base">
              <li>
                <a
                  href="/how-it-works"
                  className="hover:text-forestGreen transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-deepBlue transition-colors">
                  Features
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="hover:text-crimson transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="font-semibold mb-3 sm:mb-4 text-inkBlack text-base sm:text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Support
            </h4>
            <ul className="space-y-2 text-sepia text-sm sm:text-base">
              <li>
                <a
                  href="/faq"
                  className="hover:text-forestGreen transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-deepBlue transition-colors"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="mailto:earnalyzer@gmail.com?subject=Support%20Request&body=Hi,%0D%0AI%20need%20help%20with..."
                  className="hover:text-deepBlue transition-colors"
                >
                  Contact Support
                </a>
              </li>

              <li>
                <a
                  href="/security"
                  className="hover:text-crimson transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="font-semibold mb-3 sm:mb-4 text-inkBlack text-base sm:text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Legal
            </h4>
            <ul className="space-y-2 text-sepia text-sm sm:text-base">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-crimson transition-colors"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="/legal" className="hover:text-deepBlue">
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="/policies" className="hover:text-inkBlack">
                  Combined Policies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t border-charcoal mt-8 pt-8 text-center text-sepia text-sm sm:text-base"
          style={{ borderTopWidth: "2px" }}
        >
          <p>&copy; 2025 Earnalyzer</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
