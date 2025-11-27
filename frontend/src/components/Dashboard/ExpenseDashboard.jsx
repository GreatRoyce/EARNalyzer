import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer as BarResponsiveContainer } from "recharts";
import { FiDownload, FiPlus } from "react-icons/fi";
import SessionCard from "./SessionCard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

const ExpenseDashboard = ({ session, history, onAddExpense, onConcludeSession, onDownloadPDF, onCreateSession }) => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;
    await onAddExpense(session._id, { title: expenseTitle, amount: Number(expenseAmount) });
    setExpenseTitle("");
    setExpenseAmount("");
  };

  // Pie chart data
  const pieData = session?.expenses?.length
    ? session.expenses.map((exp, index) => {
        const percentage = (exp.amount / session.incomeAmount) * 100;
        return { name: exp.title || `Expense ${index + 1}`, value: exp.amount, percentage, displayValue: `${percentage.toFixed(1)}%` };
      })
    : [];

  const remainingBalance = session?.balance || 0;
  const remainingPercentage = session ? (remainingBalance / session.incomeAmount) * 100 : 0;

  const completePieData = session
    ? [
        ...pieData,
        {
          name: "Remaining Balance",
          value: remainingBalance,
          percentage: remainingPercentage,
          displayValue: `${remainingPercentage.toFixed(1)}%`,
          fill: "#E5E7EB",
        },
      ]
    : [];

  // Bar chart data
  const barData = history.map((s) => ({
    date: new Date(s.createdAt).toLocaleDateString(),
    income: s.incomeAmount,
    balance: s.balance,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">Amount: {data.value}</p>
          <p className="text-sm text-gray-600">Percentage: {data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  // Pie label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    if (percentage < 5) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${percentage.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex-1 p-4 md:p-6 overflow-auto">
      {session ? (
        <>
          {/* Header with PDF Download */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-light text-slate-900">Financial Dashboard</h1>

            {/* ✅ Show PDF button only if session is concluded */}
            {session.isConcluded ? (
              <button
                onClick={() => onDownloadPDF(session._id)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base w-full sm:w-auto justify-center"
              >
                <FiDownload className="h-4 w-4" />
                Download PDF Report
              </button>
            ) : (
              <span className="text-sm text-slate-500 italic">PDF available after session is concluded</span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            <SessionCard session={session} onConclude={onConcludeSession} />

            <div className="flex-1 flex flex-col gap-4 md:gap-6">
              {/* Pie Chart */}
              <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border border-white/20">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-slate-800">
                  Budget Allocation ({session.incomeAmount} total)
                </h2>
                {completePieData.length ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={completePieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={60}
                        paddingAngle={2}
                        label={renderCustomizedLabel}
                        labelLine={false}
                      >
                        {completePieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={(value) => {
                          const data = completePieData.find((item) => item.name === value);
                          return (
                            <span style={{ color: "#333", fontSize: "12px" }}>
                              {value}: {data?.percentage.toFixed(1)}%
                            </span>
                          );
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                    <div className="text-lg mb-2">No expenses yet</div>
                    <div className="text-sm">Add expenses to see the chart</div>
                  </div>
                )}
              </div>

              {/* Bar Chart */}
              <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border border-white/20">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-slate-800">Income vs Balance</h2>
                {barData.length ? (
                  <BarResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" fill="#0088FE" radius={[4, 4, 0, 0]} name="Income" />
                      <Bar dataKey="balance" fill="#00C49F" radius={[4, 4, 0, 0]} name="Balance" />
                    </BarChart>
                  </BarResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-slate-500">
                    <div className="text-lg mb-2">No session history</div>
                    <div className="text-sm">Complete sessions to see trends</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Add Expense Form */}
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border border-white/20 mt-4 md:mt-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-slate-800">Add Expense</h2>
            <form className="flex flex-col sm:flex-row gap-3 md:gap-4" onSubmit={handleSubmit}>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Expense Title"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 text-sm md:text-base"
                  required
                />
              </div>
              <div className="w-full sm:w-32">
                <input
                  type="number"
                  placeholder="Amount"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 text-sm md:text-base"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <button
                type="submit"
                className="px-4 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-medium text-sm md:text-base justify-center"
              >
                <FiPlus className="h-4 w-4" />
                Add Expense
              </button>
            </form>
          </div>

          {/* Session History Table */}
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg border border-white/20 mt-4 md:mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800">Session History</h2>
              <span className="text-sm text-slate-600">{history.length} sessions</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50/80">
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold text-slate-700 border-b border-slate-200">Date</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold text-slate-700 border-b border-slate-200">Income</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold text-slate-700 border-b border-slate-200">Expenses</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold text-slate-700 border-b border-slate-200">Balance</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold text-slate-700 border-b border-slate-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50/50 transition-colors duration-150">
                      <td className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-slate-700 border-b border-slate-100">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-medium text-slate-900 border-b border-slate-100">
                        {s.incomeAmount}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm text-slate-700 border-b border-slate-100">
                        {s.expenses.length}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm font-medium text-slate-900 border-b border-slate-100">
                        {s.balance}
                      </td>
                      <td className="px-3 py-2 md:px-4 md:py-3 border-b border-slate-100">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          s.isConcluded ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {s.isConcluded ? "Concluded" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 px-4">
          <div className="text-slate-500 text-lg mb-4">No active session</div>
          <button
            onClick={onCreateSession}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            Start New Session
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseDashboard;
