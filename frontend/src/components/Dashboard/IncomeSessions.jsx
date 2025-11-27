import React from "react";
import {
  FiPlus,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiPieChart,
  FiTrash2,
} from "react-icons/fi";
import CustomButton from "../../components/ui/CustomButtton";

// Sub-components for better organization
const HeaderSection = ({ onCreateSession, creatingSession }) => (
  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 lg:mb-8">
    <CustomButton
      title="New Session"
      variant="success"
      size="medium"
      handleClick={onCreateSession}
      loading={creatingSession}
      styles="w-full lg:w-auto shadow-sm lg:shadow-md"
      icon={<FiPlus className="w-4 h-4" />}
    />
  </div>
);

const MobileStats = ({ activeSessions, concludedSessions }) => (
  <div className=" lg:hidden grid grid-cols-2 gap-3 mb-4">
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 text-center">
      <div className="text-lg font-bold text-green-600">
        {activeSessions.length}
      </div>
      <div className="text-xs text-slate-600">Active</div>
    </div>
    <div className=" bg-white rounded-xl shadow-sm border border-slate-200 p-3 text-center">
      <div className="text-lg font-bold text-blue-600">
        {concludedSessions.length}
      </div>
      <div className="text-xs text-slate-600">Completed</div>
    </div>
  </div>
);

const SessionStatsGrid = ({ currentSession }) => (
  <div className=" p-2 grid grid-cols-3 gap-1 lg:gap-2 mb-4 lg:mb-6">
    <div className="text-center p-3 lg:p-4 bg-green-50 rounded-lg lg:rounded-xl">
      <div className="text-sm lg:text-2xl font-bold text-green-600">
        {currentSession.incomeAmount.toFixed(2)}
      </div>
      <div className="text-xs lg:text-sm text-slate-600">Starting</div>
    </div>
    <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg lg:rounded-xl">
      <div className="text-sm lg:text-2xl font-bold text-blue-600">
        {currentSession.expenses?.length || 0}
      </div>
      <div className="text-xs lg:text-sm text-slate-600">Expenses</div>
    </div>
    <div className="text-center p-3 lg:p-4 bg-slate-50 rounded-lg lg:rounded-xl">
      <div className="text-sm lg:text-2xl font-bold text-slate-600">
        {currentSession.balance?.toFixed(2) || "0.00"}
      </div>
      <div className="text-xs lg:text-sm text-slate-600">Remaining</div>
    </div>
  </div>
);

const MobileProgressBar = ({ currentSession }) => {
  const spent = currentSession.incomeAmount - currentSession.balance;
  const utilization = (spent / currentSession.incomeAmount) * 100;

  return (
    <div className="lg:hidden mb-4">
      <div className="flex justify-between text-xs text-slate-600 mb-1">
        <span>Spent: {spent.toFixed(2)}</span>
        <span>Remaining: {currentSession.balance.toFixed(2)}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${utilization}%` }}
        />
      </div>
    </div>
  );
};

const ActiveSessionCard = ({ currentSession, onConcludeSession }) => (
  <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-4 lg:p-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg lg:text-xl font-semibold text-slate-800 flex items-center gap-2">
        <FiDollarSign className="text-green-500" />
        Active Session
      </h2>
      <span className="bg-green-100 text-green-700 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
        Active
      </span>
    </div>

    <SessionStatsGrid currentSession={currentSession} />
    <MobileProgressBar currentSession={currentSession} />

    <CustomButton
      title="Conclude Session"
      variant="danger"
      size="medium"
      handleClick={() => onConcludeSession(currentSession._id)}
      styles="w-full shadow-sm lg:shadow-md"
      icon={<FiCheckCircle className="w-4 h-4" />}
    />
  </div>
);

const NoActiveSessionCard = ({ onCreateSession, creatingSession }) => (
  <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-6 lg:p-8 text-center mb-6">
    <FiTrendingUp className="h-12 w-12 lg:h-16 lg:w-16 text-slate-400 mx-auto mb-4" />
    <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-2">
      No Active Session
    </h3>
    <p className="text-slate-600 text-sm lg:text-base mb-4 lg:mb-6">
      Start a new session to track your income and expenses
    </p>
    <CustomButton
      title="Start New Session"
      variant="success"
      size="medium"
      handleClick={onCreateSession}
      loading={creatingSession}
      styles="w-full lg:w-auto"
      icon={<FiPlus className="w-4 h-4" />}
    />
  </div>
);

const SessionHistoryHeader = ({
  history,
  activeSessions,
  concludedSessions,
}) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg lg:text-xl font-semibold text-slate-800 flex items-center gap-2">
      <FiClock className="text-slate-600" />
      Session History
      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs lg:text-sm ml-2">
        {history.length}
      </span>
    </h2>

    {/* Desktop Stats */}
    <div className="hidden lg:flex items-center gap-4 text-sm text-slate-600">
      <span className="flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        {activeSessions.length} Active
      </span>
      <span className="flex items-center gap-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        {concludedSessions.length} Completed
      </span>
    </div>
  </div>
);

const SessionItem = ({ session, onDeleteSession }) => {
  const spent = session.incomeAmount - session.balance;
  const utilization = (spent / session.incomeAmount) * 100;
  const isConcluded = session.isConcluded;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border border-slate-200 rounded-lg lg:rounded-xl hover:bg-slate-50 transition-colors gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FiDollarSign className="h-4 w-4 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-slate-900 text-sm lg:text-base truncate">
              {session.incomeAmount.toFixed(2)} Income
            </div>
            <div className="text-xs lg:text-sm text-slate-600 flex flex-wrap gap-1 lg:gap-2">
              <span>{new Date(session.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{session.expenses?.length || 0} expenses</span>
              <span>•</span>
              <span>{spent.toFixed(2)} spent</span>
            </div>
          </div>
        </div>

        {/* Progress Bar - Mobile Only */}
        <div className="lg:hidden">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>{utilization.toFixed(0)}% utilized</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${
                utilization > 80
                  ? "bg-red-500"
                  : utilization > 50
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${utilization}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span
          className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${
            isConcluded
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {isConcluded ? "Completed" : "Active"}
        </span>
        <FiCheckCircle
          className={`h-4 w-4 lg:h-5 lg:w-5 ${
            isConcluded ? "text-green-500" : "text-blue-500"
          }`}
        />
        {isConcluded && (
          <button
            onClick={() => onDeleteSession(session._id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <FiTrash2 className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

const EmptyHistoryState = () => (
  <div className="text-center py-8 lg:py-12">
    <FiPieChart className="h-12 w-12 lg:h-16 lg:w-16 text-slate-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-slate-800 mb-2">
      No Session History
    </h3>
    <p className="text-slate-600 text-sm lg:text-base">
      Your sessions will appear here once created
    </p>
  </div>
);

const MobileSummary = ({ totalIncome, totalExpenses }) => (
  <div className="lg:hidden bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-6">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-slate-800 text-sm">Session Summary</h3>
      <FiPieChart className="h-5 w-5 text-blue-500" />
    </div>
    <div className="grid grid-cols-2 gap-4 text-xs">
      <div>
        <div className="text-slate-600">Total Income</div>
        <div className="font-semibold text-slate-800">
          {totalIncome.toFixed(2)}
        </div>
      </div>
      <div>
        <div className="text-slate-600">Total Expenses</div>
        <div className="font-semibold text-slate-800">
          {totalExpenses.toFixed(2)}
        </div>
      </div>
    </div>
  </div>
);

const IncomeSessions = ({
  currentSession,
  history,
  onCreateSession,
  onConcludeSession,
  onDeleteSession,
  creatingSession = false,
}) => {
  // Calculate statistics
  const activeSessions = history.filter((session) => !session.isConcluded);
  const concludedSessions = history.filter((session) => session.isConcluded);
  const totalIncome = history.reduce(
    (sum, session) => sum + session.incomeAmount,
    0
  );
  const totalExpenses = history.reduce(
    (sum, session) =>
      sum + session.expenses.reduce((expSum, exp) => expSum + exp.amount, 0),
    0
  );

  return (
    <div className="flex-1 p-4 lg:p-6 overflow-auto">
      <div className="max-w-6xl mx-auto w-full">
        <HeaderSection
          onCreateSession={onCreateSession}
          creatingSession={creatingSession}
        />

        <MobileStats
          activeSessions={activeSessions}
          concludedSessions={concludedSessions}
        />

        {/* Current Active Session */}
        {currentSession ? (
          <ActiveSessionCard
            currentSession={currentSession}
            onConcludeSession={onConcludeSession}
          />
        ) : (
          <NoActiveSessionCard
            onCreateSession={onCreateSession}
            creatingSession={creatingSession}
          />
        )}

        {/* Session History */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-4 lg:p-6">
          <SessionHistoryHeader
            history={history}
            activeSessions={activeSessions}
            concludedSessions={concludedSessions}
          />

          {history.length === 0 ? (
            <EmptyHistoryState />
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {history.map((session) => (
                <SessionItem
                  key={session._id}
                  session={session}
                  onDeleteSession={onDeleteSession}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Summary - Mobile Only */}
        {history.length > 0 && (
          <MobileSummary
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        )}
      </div>
    </div>
  );
};

export default IncomeSessions;
