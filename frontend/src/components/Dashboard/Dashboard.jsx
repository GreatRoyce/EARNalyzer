import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import ExpenseDashboard from "./ExpenseDashboard";
import ExpenseTracking from "../Dashboard/ExpenseTracking";
import History from "./History";
import IncomeSessions from "./IncomeSessions";
import Analytics from "./Analytics";
import Reports from "./Reports";
import CustomButton from "../../components/ui/CustomButtton";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [currentSession, setCurrentSession] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");
  const [creatingSession, setCreatingSession] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Manuscript color palette
  const MANUSCRIPT_COLORS = {
    parchment: "#2A1B0D",
    agedPaper: "#3D2816",
    inkBlack: "#000000",
    sepia: "#8B4513",
    goldLeaf: "#C9A227",
    crimson: "#8B0000",
    forestGreen: "#2E8B57",
    deepBlue: "#000080",
    burntUmber: "#8B4513",
    charcoal: "#2F4F4F",
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const res = await api.get("/income-sessions/history");
        const sessions = res.data.sessions || [];
        const active = sessions.find((s) => !s.isConcluded);
        setCurrentSession(active || null);
        setHistory(sessions);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleDownloadPDF = async (sessionId) => {
    try {
      const response = await api.get(`/pdf/${sessionId}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `IncomeSession_${sessionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      alert("❌ Failed to download PDF report");
    }
  };

  const handleCreateSession = async () => {
    const incomeAmount = prompt("Enter income amount for new session:");
    if (!incomeAmount || Number(incomeAmount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    setCreatingSession(true);
    try {
      const res = await api.post("/income-sessions/create", {
        incomeAmount: Number(incomeAmount),
      });
      setCurrentSession(res.data.session);
      setHistory([res.data.session, ...history]);
      alert("✅ Session created successfully!");
    } catch (err) {
      console.error("Error creating session:", err);
      alert("Failed to create session");
    } finally {
      setCreatingSession(false);
    }
  };

  const handleAddExpense = async (sessionId, expenseData) => {
    try {
      const res = await api.post(
        `/income-sessions/${sessionId}/add-expense`,
        expenseData
      );
      setCurrentSession(res.data.session);
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  const handleConcludeSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to conclude this session?"))
      return;
    try {
      const res = await api.post(`/income-sessions/${sessionId}/conclude`);
      setCurrentSession(null);
      setHistory([res.data.session, ...history]);
      alert("✅ Session concluded successfully!");
    } catch (err) {
      console.error("Error concluding session:", err);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this session? This action cannot be undone."
      )
    )
      return;

    // Optimistic UI update
    const originalHistory = [...history];
    const originalCurrentSession = currentSession;

    // Update state to remove the deleted session from the UI immediately
    setHistory(history.filter((session) => session._id !== sessionId));
    if (currentSession && currentSession._id === sessionId) {
      setCurrentSession(null);
    }

    try {
      await api.delete(`/income-sessions/${sessionId}`);
      alert("✅ Session deleted successfully!");
    } catch (err) {
      console.error("Error deleting session:", err);
      alert("❌ Failed to delete session");

      // If the API call fails, revert the state to its original form
      setHistory(originalHistory);
      setCurrentSession(originalCurrentSession);
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close sidebar when clicking on overlay
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  if (loading)
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-red-200/20"
        style={{ fontFamily: "serif" }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{
              borderColor: MANUSCRIPT_COLORS.goldLeaf,
              borderTopColor: "transparent",
            }}
          ></div>
          <p
            className="text-lg font-medium"
            style={{ color: MANUSCRIPT_COLORS.inkBlack }}
          >
            Loading your treasury...
          </p>
        </div>
      </div>
    );

  const renderActiveView = () => {
    const viewProps = {
      Dashboard: {
        session: currentSession,
        history: history,
        onAddExpense: handleAddExpense,
        onConcludeSession: handleConcludeSession,
        onCreateSession: handleCreateSession,
        onDownloadPDF: handleDownloadPDF,
        onDeleteSession: handleDeleteSession,
      },
      "Income Sessions": {
        currentSession: currentSession,
        history: history,
        onCreateSession: handleCreateSession,
        onConcludeSession: handleConcludeSession,
        onDeleteSession: handleDeleteSession,
        creatingSession: creatingSession,
      },
      "Expense Tracking": {
        currentSession: currentSession,
        onAddExpense: handleAddExpense,
      },
      History: {
        history: history,
        onDownloadPDF: handleDownloadPDF,
        onDeleteSession: handleDeleteSession,
      },
      Analytics: {
        history: history,
        currentSession: currentSession,
      },
      Reports: {
        history: history,
        onDownloadPDF: handleDownloadPDF,
      },
    };

    const components = {
      Dashboard: ExpenseDashboard,
      "Income Sessions": IncomeSessions,
      "Expense Tracking": ExpenseTracking,
      History: History,
      Analytics: Analytics,
      Reports: Reports,
    };

    const Component = components[activeView];
    return Component ? <Component {...viewProps[activeView]} /> : null;
  };

  return (
    <div
      className="flex flex-col h-screen bg-white overflow-hidden"
      style={{ fontFamily: "serif" }}
    >
      {/* Fixed topbar */}
      <div className="flex-shrink-0">
        <Topbar
          username={user?.username}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          currentView={activeView}
          sidebarOpen={sidebarOpen}
          manuscriptColors={MANUSCRIPT_COLORS}
        />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ backgroundColor: `${MANUSCRIPT_COLORS.inkBlack}80` }}
            onClick={handleOverlayClick}
          />
        )}

        {/* Sidebar - Mobile Drawer & Desktop Fixed */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:flex-shrink-0
          w-80 overflow-y-auto
          border-r-2
        `}
          style={{
            backgroundColor: "white",
            borderColor: MANUSCRIPT_COLORS.charcoal,
          }}
        >
          <Sidebar
            history={history}
            onCreateSession={handleCreateSession}
            activeView={activeView}
            onViewChange={handleViewChange}
            onLogout={handleLogout}
            creatingSession={creatingSession}
            onCloseSidebar={() => setSidebarOpen(false)}
            manuscriptColors={MANUSCRIPT_COLORS}
          />
        </div>

        {/* Scrollable main area */}
        <main className="flex-1 overflow-y-auto py-2 lg:p-6 min-w-0 bg-white">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
            {/* Header Section - Responsive */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <h1
                  className="text-2xl lg:text-3xl font-bold mb-2 break-words"
                  style={{ color: MANUSCRIPT_COLORS.inkBlack }}
                >
                  {activeView}
                </h1>
                <p
                  className="text-sm lg:text-base"
                  style={{ color: MANUSCRIPT_COLORS.sepia }}
                >
                  {getViewDescription(activeView)}
                </p>
              </div>

              {/* Quick Actions - Responsive */}
              {activeView === "Dashboard" && currentSession && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <CustomButton
                    title="Add Expense"
                    variant="primary"
                    size={isMobile ? "small" : "medium"}
                    handleClick={() => handleViewChange("Expense Tracking")}
                    styles="shadow-lg w-full sm:w-auto border-2"
                    manuscriptColors={MANUSCRIPT_COLORS}
                  />
                  <CustomButton
                    title="Conclude Session"
                    variant="danger"
                    size={isMobile ? "small" : "medium"}
                    handleClick={() =>
                      handleConcludeSession(currentSession._id)
                    }
                    styles="shadow-lg w-full sm:w-auto border-2"
                    manuscriptColors={MANUSCRIPT_COLORS}
                  />
                </div>
              )}

              {activeView === "Dashboard" && !currentSession && (
                <CustomButton
                  title="Start New Session"
                  variant="success"
                  size={isMobile ? "small" : "medium"}
                  handleClick={handleCreateSession}
                  loading={creatingSession}
                  styles="shadow-lg w-full lg:w-auto border-2"
                  manuscriptColors={MANUSCRIPT_COLORS}
                />
              )}
            </div>

            {/* Main Content */}
            <div className="w-full">{renderActiveView()}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

const getViewDescription = (view) => {
  const descriptions = {
    Dashboard: "Overview of your treasury and key financial metrics",
    "Income Sessions": "Manage your active income sessions and grants",
    "Expense Tracking": "Track your expenditures and allocations",
    History: "Review past financial sessions and records",
    Analytics: "Visual insights and financial wisdom",
    Reports: "Generate and download illuminated PDF summaries",
  };
  return descriptions[view] || "";
};

export default Dashboard;
