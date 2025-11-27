// Topbar.jsx - Updated for mobile with manuscript theme
import React from "react";
import { FiMenu, FiX, FiBell, FiUser } from "react-icons/fi";

const Topbar = ({
  username,
  onMenuToggle,
  currentView,
  sidebarOpen,
  manuscriptColors,
}) => {
  return (
    <div
      className="bg-white px-4 lg:px-6 py-4 border-b-2"
      style={{
        borderColor: manuscriptColors.charcoal,
        fontFamily: "serif",
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and current view */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg transition-colors border-2"
            style={{
              borderColor: manuscriptColors.charcoal,
              color: manuscriptColors.inkBlack,
            }}
          >
            {sidebarOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <div
              className=" hidden w-8 h-8 rounded-full items-center justify-center lg:hidden border-2"
              style={{
                backgroundColor: manuscriptColors.forestGreen,
                borderColor: manuscriptColors.inkBlack,
              }}
            >
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <div className="hidden lg:block">
              <h2
                className="text-lg font-semibold"
                style={{ color: manuscriptColors.inkBlack }}
              >
                {currentView}
              </h2>
            </div>
          </div>
        </div>

        {/* Right side - User info and notifications */}
        <div className="flex items-center gap-4">
          {/* Optional: Add notifications back if needed
          <button 
            className="p-2 rounded-lg transition-colors border-2 relative"
            style={{ 
              borderColor: manuscriptColors.charcoal,
              color: manuscriptColors.inkBlack
            }}
          >
            <FiBell className="w-5 h-5" />
          </button>
          */}

          <div className="flex items-center gap-3">
            {/* Mobile user avatar - hidden on desktop since sidebar shows it */}
            <div
              className="hidden w-10 h-10 rounded-full items-center justify-center border-2 lg:hidden"
              style={{
                backgroundColor: manuscriptColors.forestGreen,
                borderColor: manuscriptColors.inkBlack,
              }}
            >
              <FiUser className="w-5 h-5 text-white" />
            </div>

            <div className="hidden sm:block text-right">
              <p
                className="text-sm font-medium capitalize"
                style={{ color: manuscriptColors.inkBlack }}
              >
                Welcome, {username}
              </p>
              <p className="text-xs" style={{ color: manuscriptColors.sepia }}>
                May your coffers overflow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile current view - shown only on mobile */}
      <div
        className="lg:hidden mt-3 pt-3 border-t"
        style={{ borderColor: `${manuscriptColors.charcoal}30` }}
      >
        <h2
          className="text-xl font-bold text-center"
          style={{ color: manuscriptColors.inkBlack }}
        >
          {currentView}
        </h2>
        <p
          className="text-xs text-center mt-1"
          style={{ color: manuscriptColors.sepia }}
        >
          {getViewSubtitle(currentView)}
        </p>
      </div>
    </div>
  );
};

// Helper function for view subtitles
const getViewSubtitle = (view) => {
  const subtitles = {
    Dashboard: "Treasury Overview",
    "Income Sessions": "Manage Your Grants",
    "Expense Tracking": "Track Expenditures",
    History: "Past Records",
    Analytics: "Financial Wisdom",
    Reports: "Illuminated Summaries",
  };
  return subtitles[view] || "Financial Management";
};

export default Topbar;
