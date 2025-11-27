import React, { useState, useMemo } from "react";
import {
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
  FiDollarSign,
  FiCalendar,
  FiArrowUp,
  FiArrowDown,
  FiFilter,
} from "react-icons/fi";

const Analytics = ({ history, currentSession }) => {
  // Manuscript color palette matching ChartsSection
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

  const [timeFilter, setTimeFilter] = useState("all"); // all, month, quarter, year
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get unique categories for filter
  const allCategories = useMemo(() => {
    const categories = new Set();
    history.forEach((session) => {
      session.expenses.forEach((expense) => {
        categories.add(expense.title || "Uncategorized");
      });
    });
    return ["all", ...Array.from(categories)].sort();
  }, [history]);

  // Calculate analytics data with filters
  const analyticsData = useMemo(() => {
    let filteredHistory = history;

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date();
      const timeMap = {
        month: 30,
        quarter: 90,
        year: 365,
      };
      const daysAgo = timeMap[timeFilter];
      const cutoffDate = new Date(now);
      cutoffDate.setDate(now.getDate() - daysAgo);

      filteredHistory = history.filter(
        (session) => new Date(session.createdAt) >= cutoffDate
      );
    }

    // Calculate totals from filtered history
    const totalIncome = filteredHistory.reduce(
      (sum, session) => sum + parseFloat(session.incomeAmount || 0),
      0
    );

    const totalExpenses = filteredHistory.reduce(
      (sum, session) =>
        sum + session.expenses.reduce((expSum, exp) => expSum + parseFloat(exp.amount || 0), 0),
      0
    );

    const totalSavings = totalIncome - totalExpenses;
    const savingsRate =
      totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

    const averageSessionLength =
      filteredHistory.length > 0 ? totalExpenses / filteredHistory.length : 0;

    // Category spending with filter
    const categorySpending = filteredHistory.reduce((acc, session) => {
      session.expenses.forEach((expense) => {
        const category = expense.title || "Uncategorized";
        if (categoryFilter === "all" || category === categoryFilter) {
          acc[category] = (acc[category] || 0) + parseFloat(expense.amount || 0);
        }
      });
      return acc;
    }, {});

    // Monthly trends
    const monthlyData = filteredHistory.reduce((acc, session) => {
      const date = new Date(session.createdAt);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!acc[monthYear]) {
        acc[monthYear] = { income: 0, expenses: 0, sessions: 0 };
      }

      acc[monthYear].income += parseFloat(session.incomeAmount || 0);
      acc[monthYear].expenses += session.expenses.reduce(
        (sum, exp) => sum + parseFloat(exp.amount || 0),
        0
      );
      acc[monthYear].sessions += 1;

      return acc;
    }, {});

    // Top categories
    const topCategories = Object.entries(categorySpending)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6);

    // Session utilization rates
    const sessionUtilizations = filteredHistory.map((session) => {
      const spent = parseFloat(session.incomeAmount || 0) - parseFloat(session.balance || 0);
      const utilization =
        parseFloat(session.incomeAmount || 0) > 0 ? (spent / parseFloat(session.incomeAmount || 0)) * 100 : 0;
      return {
        ...session,
        utilization,
        spent,
      };
    });

    // Active sessions count
    const activeSessions = filteredHistory.filter((s) => !s.isConcluded).length;

    return {
      filteredHistory,
      totalIncome,
      totalExpenses,
      totalSavings,
      savingsRate,
      averageSessionLength,
      categorySpending,
      monthlyData,
      topCategories,
      sessionUtilizations,
      activeSessions,
    };
  }, [history, timeFilter, categoryFilter]);

  const {
    filteredHistory,
    totalIncome,
    totalExpenses,
    totalSavings,
    savingsRate,
    averageSessionLength,
    categorySpending,
    monthlyData,
    topCategories,
    sessionUtilizations,
    activeSessions,
  } = analyticsData;

  const getUtilizationColor = (utilization) => {
    if (utilization > 80)
      return {
        color: MANUSCRIPT_COLORS.crimson,
        bg: `${MANUSCRIPT_COLORS.crimson}20`,
      };
    if (utilization > 50)
      return {
        color: MANUSCRIPT_COLORS.goldLeaf,
        bg: `${MANUSCRIPT_COLORS.goldLeaf}20`,
      };
    return {
      color: MANUSCRIPT_COLORS.forestGreen,
      bg: `${MANUSCRIPT_COLORS.forestGreen}20`,
    };
  };

  const categoryColors = [
    MANUSCRIPT_COLORS.crimson,
    MANUSCRIPT_COLORS.deepBlue,
    MANUSCRIPT_COLORS.forestGreen,
    MANUSCRIPT_COLORS.goldLeaf,
    MANUSCRIPT_COLORS.sepia,
    MANUSCRIPT_COLORS.burntUmber,
  ];

  return (
    <div
      className="flex-1 p-4 lg:p-6 overflow-auto bg-gray-50"
      style={{ fontFamily: "serif" }}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Filters */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-xl border-2 shadow-sm"
          style={{ borderColor: MANUSCRIPT_COLORS.charcoal + "20" }}
        >
          <div className="flex items-center gap-2 flex-1">
            <FiFilter style={{ color: MANUSCRIPT_COLORS.sepia }} />
            <span
              className="text-sm font-medium"
              style={{ color: MANUSCRIPT_COLORS.inkBlack }}
            >
              Filters:
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors"
              style={{
                borderColor: MANUSCRIPT_COLORS.charcoal + "40",
                color: MANUSCRIPT_COLORS.inkBlack,
                backgroundColor: "white",
              }}
            >
              <option value="all">All Time</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last Year</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors"
              style={{
                borderColor: MANUSCRIPT_COLORS.charcoal + "40",
                color: MANUSCRIPT_COLORS.inkBlack,
                backgroundColor: "white",
              }}
            >
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            {/* Filter Summary */}
            <div className="flex items-center text-xs" style={{ color: MANUSCRIPT_COLORS.sepia }}>
              Showing {filteredHistory.length} session{filteredHistory.length !== 1 ? 's' : ''}
              {categoryFilter !== 'all' && ` in "${categoryFilter}"`}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <MetricCard
            title="Total Income"
            value={totalIncome}
            subtitle="Across filtered sessions"
            icon={FiTrendingUp}
            color={MANUSCRIPT_COLORS.forestGreen}
            trend="total"
          />

          <MetricCard
            title="Total Expenses"
            value={totalExpenses}
            subtitle="All filtered spending"
            icon={FiBarChart2}
            color={MANUSCRIPT_COLORS.crimson}
            trend="total"
          />

          <MetricCard
            title="Net Savings"
            value={totalSavings}
            subtitle="Income minus expenses"
            icon={FiDollarSign}
            color={
              totalSavings >= 0
                ? MANUSCRIPT_COLORS.forestGreen
                : MANUSCRIPT_COLORS.crimson
            }
            trend={totalSavings >= 0 ? "positive" : "negative"}
          />

          <MetricCard
            title="Savings Rate"
            value={savingsRate}
            subtitle="Percentage of income saved"
            icon={FiPieChart}
            color={MANUSCRIPT_COLORS.goldLeaf}
            isPercentage={true}
            trend={
              savingsRate >= 20
                ? "positive"
                : savingsRate >= 0
                ? "neutral"
                : "negative"
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Spending by Category */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-xl lg:rounded-2xl shadow-lg border-2 p-4 lg:p-6 h-full"
              style={{ borderColor: MANUSCRIPT_COLORS.deepBlue }}
            >
              <h2
                className="text-lg lg:text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: MANUSCRIPT_COLORS.inkBlack }}
              >
                <FiPieChart style={{ color: MANUSCRIPT_COLORS.deepBlue }} />
                Top Categories
              </h2>

              {topCategories.length === 0 ? (
                <div className="text-center py-8">
                  <FiPieChart
                    className="h-12 w-12 mx-auto mb-3"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  />
                  <p
                    className="text-sm mb-1"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  >
                    No spending data available
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  >
                    {categoryFilter !== "all" ? `No expenses found in "${categoryFilter}"` : "Add expenses to see category breakdown"}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 lg:space-y-4">
                  {topCategories.map(([category, amount], index) => {
                    const percentage =
                      totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
                    const color = categoryColors[index % categoryColors.length];

                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between p-2 lg:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span
                            className="text-sm lg:text-base truncate"
                            style={{ color: MANUSCRIPT_COLORS.inkBlack }}
                          >
                            {category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span
                            className="font-semibold text-sm lg:text-base"
                            style={{ color: MANUSCRIPT_COLORS.inkBlack }}
                          >
                            {amount.toFixed(2)}
                          </span>
                          <span
                            className="text-xs w-12 text-right"
                            style={{ color: MANUSCRIPT_COLORS.sepia }}
                          >
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-xl lg:rounded-2xl shadow-lg border-2 p-4 lg:p-6 h-full"
              style={{ borderColor: MANUSCRIPT_COLORS.forestGreen }}
            >
              <h2
                className="text-lg lg:text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: MANUSCRIPT_COLORS.inkBlack }}
              >
                <FiTrendingUp
                  style={{ color: MANUSCRIPT_COLORS.forestGreen }}
                />
                Monthly Trends
              </h2>

              {Object.keys(monthlyData).length === 0 ? (
                <div className="text-center py-8">
                  <FiTrendingUp
                    className="h-12 w-12 mx-auto mb-3"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  />
                  <p
                    className="text-sm mb-1"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  >
                    No monthly data available
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  >
                    Create sessions to see trends
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(monthlyData)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .slice(0, 6)
                    .map(([month, data]) => {
                      const monthlySavings = data.income - data.expenses;
                      const monthlySavingsRate =
                        data.income > 0
                          ? (monthlySavings / data.income) * 100
                          : 0;

                      return (
                        <div
                          key={month}
                          className="border-2 rounded-lg p-3 hover:shadow-md transition-shadow"
                          style={{
                            borderColor: MANUSCRIPT_COLORS.charcoal + "20",
                          }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className="font-medium text-sm"
                              style={{ color: MANUSCRIPT_COLORS.inkBlack }}
                            >
                              {new Date(month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                            <span
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={getUtilizationColor(100 - monthlySavingsRate)}
                            >
                              {monthlySavingsRate.toFixed(0)}% saved
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div style={{ color: MANUSCRIPT_COLORS.sepia }}>
                                Income
                              </div>
                              <div
                                style={{ color: MANUSCRIPT_COLORS.forestGreen }}
                                className="font-semibold"
                              >
                                {data.income.toFixed(2)}
                              </div>
                            </div>
                            <div>
                              <div style={{ color: MANUSCRIPT_COLORS.sepia }}>
                                Expenses
                              </div>
                              <div
                                style={{ color: MANUSCRIPT_COLORS.crimson }}
                                className="font-semibold"
                              >
                                {data.expenses.toFixed(2)}
                              </div>
                            </div>
                          </div>

                          <div
                            className="mt-2 text-xs"
                            style={{ color: MANUSCRIPT_COLORS.sepia }}
                          >
                            {data.sessions} session
                            {data.sessions !== 1 ? "s" : ""}
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Session Performance */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-xl lg:rounded-2xl shadow-lg border-2 p-4 lg:p-6 h-full"
              style={{ borderColor: MANUSCRIPT_COLORS.goldLeaf }}
            >
              <h2
                className="text-lg lg:text-xl font-semibold mb-4 flex items-center gap-2"
                style={{ color: MANUSCRIPT_COLORS.inkBlack }}
              >
                <FiCalendar style={{ color: MANUSCRIPT_COLORS.goldLeaf }} />
                Session Performance
              </h2>

              {sessionUtilizations.length === 0 ? (
                <div className="text-center py-8">
                  <FiCalendar
                    className="h-12 w-12 mx-auto mb-3"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  />
                  <p
                    className="text-sm mb-1"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  >
                    No session data available
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: MANUSCRIPT_COLORS.sepia }}
                  >
                    Create sessions to track performance
                  </p>
                </div>
              ) : (
                <div className="space-y-3 lg:space-y-4 max-h-96 overflow-y-auto">
                  {sessionUtilizations.slice(0, 8).map((session) => {
                    const { color, bg } = getUtilizationColor(
                      session.utilization
                    );

                    return (
                      <div
                        key={session._id}
                        className="border-2 rounded-lg lg:rounded-xl p-3 lg:p-4 hover:shadow-md transition-shadow"
                        style={{
                          borderColor: MANUSCRIPT_COLORS.charcoal + "20",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                          <span
                            className="font-medium text-sm lg:text-base truncate"
                            style={{ color: MANUSCRIPT_COLORS.inkBlack }}
                          >
                            {new Date(session.createdAt).toLocaleDateString()}
                          </span>
                          <span
                            className="text-xs font-medium px-2 py-1 rounded-full"
                            style={{ backgroundColor: bg, color }}
                          >
                            {session.utilization.toFixed(0)}% utilized
                          </span>
                        </div>

                        <div
                          className="w-full rounded-full h-2 mb-2"
                          style={{
                            backgroundColor: MANUSCRIPT_COLORS.charcoal + "20",
                          }}
                        >
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(session.utilization, 100)}%`,
                              backgroundColor: color,
                            }}
                          />
                        </div>

                        <div className="flex flex-col xs:flex-row justify-between text-xs gap-1">
                          <span
                            className="truncate"
                            style={{ color: MANUSCRIPT_COLORS.sepia }}
                          >
                            Spent: {session.spent.toFixed(2)}
                          </span>
                          <span
                            className="truncate"
                            style={{ color: MANUSCRIPT_COLORS.sepia }}
                          >
                            Remaining: {parseFloat(session.balance || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {sessionUtilizations.length > 8 && (
                    <div className="text-center pt-2">
                      <p
                        className="text-sm"
                        style={{ color: MANUSCRIPT_COLORS.sepia }}
                      >
                        +{sessionUtilizations.length - 8} more sessions
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SummaryStat
            title="Total Sessions"
            value={filteredHistory.length}
            color={MANUSCRIPT_COLORS.deepBlue}
          />
          <SummaryStat
            title="Avg. Session Spend"
            value={averageSessionLength}
            color={MANUSCRIPT_COLORS.goldLeaf}
            isCurrency={true}
          />
          <SummaryStat
            title="Active Sessions"
            value={activeSessions}
            color={MANUSCRIPT_COLORS.forestGreen}
          />
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  isPercentage = false,
  trend,
}) => {
  const displayValue = isPercentage ? value.toFixed(1) : Math.abs(value).toFixed(2);
  const displaySuffix = isPercentage ? "%" : "";

  return (
    <div
      className="bg-white rounded-xl lg:rounded-2xl shadow-lg border-2 p-4 lg:p-6 hover:shadow-xl transition-shadow"
      style={{ borderColor: color }}
    >
      <div className="flex items-center gap-3 mb-3 lg:mb-4">
        <div
          className="p-2 rounded-lg flex-shrink-0"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-5 w-5 lg:h-6 lg:w-6" style={{ color }} />
        </div>
        <h3
          className="font-semibold text-sm lg:text-base"
          style={{ color: "#000000" }}
        >
          {title}
        </h3>
      </div>
      <div
        className="text-2xl lg:text-3xl font-bold mb-1"
        style={{ color: "#000000" }}
      >
        {isPercentage || value >= 0 ? '' : '-'}{displayValue}
        {displaySuffix}
      </div>
      <div className="flex items-center justify-between">
        <div
          className="text-xs lg:text-sm"
          style={{ color: "#8B4513" }}
        >
          {subtitle}
        </div>
        {trend && trend !== "total" && (
          <div
            className={`flex items-center gap-1 text-xs ${
              trend === "positive"
                ? "text-green-600"
                : trend === "negative"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {trend === "positive" ? (
              <FiArrowUp />
            ) : trend === "negative" ? (
              <FiArrowDown />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

// Summary Stat Component
const SummaryStat = ({ title, value, color, isCurrency = false }) => (
  <div
    className="bg-white rounded-xl border-2 p-4 text-center hover:shadow-md transition-shadow"
    style={{ borderColor: color + "40", backgroundColor: color + "10" }}
  >
    <div className="text-lg lg:text-xl font-bold mb-1" style={{ color }}>
      {isCurrency ? `$${value.toFixed(2)}` : value}
    </div>
    <div
      className="text-xs lg:text-sm"
      style={{ color: "#8B4513" }}
    >
      {title}
    </div>
  </div>
);

export default Analytics;