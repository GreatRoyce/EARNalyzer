// src/components/LandingPage/Navigation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navigation({ isMenuOpen, toggleMenu }) {
  const navigate = useNavigate();

  return (
    <nav
      className="fixed top-0 w-full bg-parchment/95 backdrop-blur-sm z-50 border-b border-charcoal"
      style={{ borderWidth: "2px", fontFamily: "serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-inkBlack"
              style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
            >
              Earnalyzer
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-sepia hover:text-forestGreen font-semibold text-[#8B0000] transition-all duration-300 px-3 py-2 rounded-lg hover:bg-forestGreen/20 hover:text-[#32280D]"
              style={{ fontFamily: "serif" }}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sepia hover:text-deepBlue font-medium px-3 py-2 rounded-lg hover:bg-deepBlue/5 hover:underline transition-all duration-500"
              style={{ fontFamily: "serif" }}
            >
              Testimonials
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="text-sepia hover:text-forestGreen transition-all hover:bg-orange-800/20 duration-300 font-semibold px-4 py-2 rounded-lg hover:bg-forestGreen/5 border border-charcoal"
              style={{ fontFamily: "serif", borderWidth: "1px" }}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-forestGreen text-parchment font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 "
              style={{ fontFamily: "serif" }} 
            >
              Signup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-inkBlack hover:text-forestGreen transition-colors duration-300 p-2"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-charcoal bg-parchment/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation Links */}
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-sepia hover:text-forestGreen hover:bg-forestGreen/5 rounded-lg transition-all duration-300"
                style={{ fontFamily: "serif" }}
                onClick={() => toggleMenu()}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-sepia hover:text-deepBlue hover:bg-deepBlue/5 rounded-lg transition-all duration-300"
                style={{ fontFamily: "serif" }}
                onClick={() => toggleMenu()}
              >
                Testimonials
              </a>

              {/* Mobile Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 text-sepia hover:text-forestGreen hover:bg-forestGreen/5 border border-charcoal rounded-lg transition-all duration-300"
                  style={{ fontFamily: "serif", borderWidth: "1px" }}
                >
                  Enter Study
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    toggleMenu();
                  }}
                  className="w-full text-left px-3 py-2 bg-forestGreen text-parchment font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                  style={{ fontFamily: "serif" }}
                >
                  Begin Your Ledger
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;