import React, { useState } from "react";
import {
  FiHome,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiFileText,
  FiClock,
  FiPlus,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiPieChart,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/CustomButtton";

const Sidebar = ({
  history,
  onCreateSession,
  onViewChange,
  activeView,
  creatingSession = false,
  onCloseSidebar,
  manuscriptColors,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    quickStats: true,
    recentSessions: false,
  });
  const navigate = useNavigate();

  const toggleSection = (section) =>
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  // Calculate statistics
  const totalExpenses = history.reduce(
    (acc, session) =>
      acc + session.expenses.reduce((sum, expense) => sum + expense.amount, 0),
    0
  );

  const activeSessions = history.filter(
    (session) => !session.isConcluded
  ).length;
  const concludedSessions = history.filter(
    (session) => session.isConcluded
  ).length;

  // Recent sessions (last 5)
  const recentSessions = history.slice(0, 5);

  const menuItems = [
    { label: "Dashboard", icon: FiHome, description: "Treasury overview" },
    {
      label: "Income Sessions",
      icon: FiDollarSign,
      description: "Manage grants",
    },
    {
      label: "Expense Tracking",
      icon: FiTrendingUp,
      description: "Track expenditures",
    },
    { label: "History", icon: FiClock, description: "Past records" },
    { label: "Analytics", icon: FiBarChart2, description: "Financial wisdom" },
    { label: "Reports", icon: FiFileText, description: "Illuminated summaries" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleViewChange = (view) => {
    onViewChange(view);
    // Close sidebar on mobile after selecting a view
    if (window.innerWidth < 1024 && onCloseSidebar) {
      onCloseSidebar();
    }
  };

  const handleCreateSessionClick = () => {
    onCreateSession();
    // Close sidebar on mobile after creating session
    if (window.innerWidth < 1024 && onCloseSidebar) {
      onCloseSidebar();
    }
  };

  const getSessionStatus = (session) => {
    return session.isConcluded ? "Concluded" : "Active";
  };

  const getStatusColor = (session) => {
    return session.isConcluded
      ? { text: manuscriptColors.forestGreen, bg: `${manuscriptColors.forestGreen}20` }
      : { text: manuscriptColors.deepBlue, bg: `${manuscriptColors.deepBlue}20` };
  };

  return (
    <div 
      className="w-88 py-10 bg-white p-6 flex flex-col h-screen"
      style={{ fontFamily: "serif" }}
    >
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 
            className="text-2xl font-bold italic"
            style={{ color: manuscriptColors.inkBlack }}
          >
            Earnalyzer
          </h1>
          <p 
            className="text-sm mt-1"
            style={{ color: manuscriptColors.sepia }}
          >
            Ancient Financial Wisdom
          </p>
        </div>
        
        {/* Close Button - Only visible on mobile */}
        <button
          onClick={onCloseSidebar}
          className="lg:hidden p-2 rounded-lg transition-colors flex-shrink-0 ml-4 border-2"
          style={{ 
            borderColor: manuscriptColors.charcoal,
            color: manuscriptColors.inkBlack
          }}
          aria-label="Close sidebar"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <CustomButton
          title="Begin New Ledger"
          variant="success"
          size="medium"
          handleClick={handleCreateSessionClick}
          loading={creatingSession}
          styles="w-full shadow-lg mb-4 border-2"
          icon={<FiPlus className="w-4 h-4" />}
          manuscriptColors={manuscriptColors}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 mb-6">
        <h3 
          className="text-xs font-semibold uppercase tracking-wider px-4 mb-2"
          style={{ color: manuscriptColors.sepia }}
        >
          The Scroll
        </h3>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => handleViewChange(item.label)}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border-2 ${
                isActive
                  ? "shadow-lg border-forestGreen"
                  : "border-transparent hover:border-charcoal hover:shadow-md"
              }`}
              style={{
                backgroundColor: isActive ? `${manuscriptColors.forestGreen}15` : 'transparent',
                borderColor: isActive ? manuscriptColors.forestGreen : 'transparent',
              }}
            >
              <Icon
                className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isActive ? manuscriptColors.forestGreen : manuscriptColors.sepia
                }`}
                style={{ color: isActive ? manuscriptColors.forestGreen : manuscriptColors.sepia }}
              />
              <div className="flex-1 text-left">
                <div 
                  className="font-medium text-sm"
                  style={{ color: isActive ? manuscriptColors.inkBlack : manuscriptColors.inkBlack }}
                >
                  {item.label}
                </div>
                <div
                  className="text-xs"
                  style={{ color: isActive ? manuscriptColors.forestGreen : manuscriptColors.sepia }}
                >
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div 
        className="rounded-xl p-4 mb-4 shadow-lg border-2"
        style={{ 
          backgroundColor: 'white',
          borderColor: manuscriptColors.deepBlue
        }}
      >
        <button
          onClick={() => toggleSection("quickStats")}
          className="flex items-center justify-between w-full mb-3 group"
        >
          <h3 
            className="text-sm font-semibold flex items-center gap-2"
            style={{ color: manuscriptColors.inkBlack }}
          >
            <FiPieChart 
              className="w-4 h-4" 
              style={{ color: manuscriptColors.deepBlue }}
            />
            Treasury Stats
          </h3>
          {expandedSections.quickStats ? (
            <FiChevronUp 
              className="w-4 h-4 group-hover:scale-110 transition-transform"
              style={{ color: manuscriptColors.sepia }}
            />
          ) : (
            <FiChevronDown 
              className="w-4 h-4 group-hover:scale-110 transition-transform"
              style={{ color: manuscriptColors.sepia }}
            />
          )}
        </button>

        {expandedSections.quickStats && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span 
                className="text-sm"
                style={{ color: manuscriptColors.sepia }}
              >
                Active Sessions
              </span>
              <span 
                className="text-sm font-semibold px-2 py-1 rounded-full"
                style={{ 
                  color: manuscriptColors.deepBlue,
                  backgroundColor: `${manuscriptColors.deepBlue}20`
                }}
              >
                {activeSessions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span 
                className="text-sm"
                style={{ color: manuscriptColors.sepia }}
              >
                Concluded
              </span>
              <span 
                className="text-sm font-semibold px-2 py-1 rounded-full"
                style={{ 
                  color: manuscriptColors.forestGreen,
                  backgroundColor: `${manuscriptColors.forestGreen}20`
                }}
              >
                {concludedSessions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span 
                className="text-sm"
                style={{ color: manuscriptColors.sepia }}
              >
                Total Expenses
              </span>
              <span 
                className="text-sm font-semibold"
                style={{ color: manuscriptColors.inkBlack }}
              >
                {totalExpenses.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span 
                className="text-sm"
                style={{ color: manuscriptColors.sepia }}
              >
                All Sessions
              </span>
              <span 
                className="text-sm font-semibold px-2 py-1 rounded-full"
                style={{ 
                  color: manuscriptColors.crimson,
                  backgroundColor: `${manuscriptColors.crimson}20`
                }}
              >
                {history.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div 
          className="rounded-xl p-4 mb-4 shadow-lg border-2"
          style={{ 
            backgroundColor: 'white',
            borderColor: manuscriptColors.goldLeaf
          }}
        >
          <button
            onClick={() => toggleSection("recentSessions")}
            className="flex items-center justify-between w-full mb-3 group"
          >
            <h3 
              className="text-sm font-semibold flex items-center gap-2"
              style={{ color: manuscriptColors.inkBlack }}
            >
              <FiClock 
                className="w-4 h-4" 
                style={{ color: manuscriptColors.goldLeaf }}
              />
              Recent Chronicles
            </h3>
            {expandedSections.recentSessions ? (
              <FiChevronUp 
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                style={{ color: manuscriptColors.sepia }}
              />
            ) : (
              <FiChevronDown 
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                style={{ color: manuscriptColors.sepia }}
              />
            )}
          </button>

          {expandedSections.recentSessions && (
            <div className="space-y-2">
              {recentSessions.map((session) => {
                const statusColors = getStatusColor(session);
                return (
                  <div
                    key={session._id}
                    className="flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors border hover:shadow-sm"
                    style={{ 
                      borderColor: `${manuscriptColors.charcoal}20`,
                      backgroundColor: `${manuscriptColors.charcoal}05`
                    }}
                    onClick={() => handleViewChange("Income Sessions")}
                  >
                    <div className="flex-1 min-w-0">
                      <div 
                        className="text-sm font-medium truncate"
                        style={{ color: manuscriptColors.inkBlack }}
                      >
                        {session.incomeAmount.toFixed(2)}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ color: manuscriptColors.sepia }}
                      >
                        {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ 
                        color: statusColors.text,
                        backgroundColor: statusColors.bg
                      }}
                    >
                      {getSessionStatus(session)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pb-10 pt-4 border-t-2" style={{ borderColor: manuscriptColors.charcoal }}>
        <CustomButton
          title="Logout"
          variant="danger"
          size="medium"
          handleClick={handleLogout}
          styles="w-full shadow-lg border-2"
          icon={<FiLogOut className="w-4 h-4" />}
          manuscriptColors={manuscriptColors}
        />

        {/* User Info */}
     
        
          
 
      </div>
    </div>
  );
};

export default Sidebar;