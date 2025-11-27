import React, { useState } from "react";
import { FiPlus, FiTrendingUp, FiClock, FiDollarSign, FiCalendar } from "react-icons/fi";
import CustomButton from "../../components/ui/CustomButtton";

const ExpenseTracking = ({ currentSession, onAddExpense, history = [], onCreateSession }) => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentSession) {
      alert("Please start a session first!");
      return;
    }
    await onAddExpense(currentSession._id, { title: expenseTitle, amount: Number(expenseAmount) });
    setExpenseTitle("");
    setExpenseAmount("");
  };

  // ✅ Safely compute recentExpenses even if history or expenses are missing
  const recentExpenses = (history ?? [])
    .flatMap((session) =>
      (session.expenses ?? []).map((expense) => ({
        ...expense,
        sessionDate: session.createdAt,
        sessionIncome: session.incomeAmount,
      }))
    )
    .sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate))
    .slice(0, 5); // Show fewer items on mobile

  // Calculate session stats
  const sessionStats = currentSession ? {
    totalExpenses: currentSession.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0,
    remainingBalance: currentSession.balance || 0,
    expenseCount: currentSession.expenses?.length || 0
  } : null;

  return (
    <div className="flex-1 p-4 lg:p-6 overflow-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
       
        {/* Session Stats - Mobile Top Bar */}
        {currentSession && (
          <div className="lg:hidden bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-600 mb-1">Expenses</div>
                <div className="text-lg font-bold text-slate-800">{sessionStats.expenseCount}</div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">Spent</div>
                <div className="text-lg font-bold text-red-600">{sessionStats.totalExpenses.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">Balance</div>
                <div className="text-lg font-bold text-green-600">{sessionStats.remainingBalance.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {/* If no active session */}
        {!currentSession ? (
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-6 lg:p-8 text-center">
            <FiTrendingUp className="h-12 w-12 lg:h-16 lg:w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-2">No Active Session</h3>
            <p className="text-slate-600 text-sm lg:text-base mb-4 lg:mb-6">Start a session to begin tracking expenses</p>
            <CustomButton
              title="Start New Session"
              variant="success"
              size="medium"
              handleClick={onCreateSession}
              styles="w-full lg:w-auto"
              icon={<FiPlus className="w-4 h-4" />}
            />
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 xl:grid-cols-2 lg:gap-6">
            {/* Session Overview - Desktop Only */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FiDollarSign className="text-green-500" />
                Session Overview
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-700">Initial Income</span>
                  <span className="font-semibold text-slate-900">{currentSession.incomeAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-700">Total Expenses</span>
                  <span className="font-semibold text-red-600">{sessionStats.totalExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-700">Remaining Balance</span>
                  <span className="font-semibold text-green-600">{sessionStats.remainingBalance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-700">Number of Expenses</span>
                  <span className="font-semibold text-blue-600">{sessionStats.expenseCount}</span>
                </div>
              </div>
            </div>

            {/* Add Expense Form */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-4 lg:p-6">
              <h2 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FiPlus className="text-green-500" />
                Add New Expense
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <input
                    type="text"
                    placeholder="What did you spend on?"
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm lg:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm lg:text-base"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <CustomButton
                  title="Add Expense"
                  variant="primary"
                  size="medium"
                  type="submit"
                  styles="w-full shadow-sm lg:shadow-md"
                  icon={<FiPlus className="w-4 h-4" />}
                />
              </form>
            </div>

            {/* Recent Expenses */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-4 lg:p-6 lg:col-span-1 xl:col-span-1">
              <h2 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <FiClock className="text-blue-500" />
                Recent Expenses
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-auto">
                  {recentExpenses.length}
                </span>
              </h2>

              {recentExpenses.length === 0 ? (
                <div className="text-center py-6 lg:py-8">
                  <FiClock className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 text-sm lg:text-base">No expenses recorded yet.</p>
                  <p className="text-slate-500 text-xs lg:text-sm mt-1">Add your first expense above</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {recentExpenses.map((expense, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg lg:rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-slate-900 text-sm lg:text-base truncate">
                            {expense.title}
                          </div>
                          <div className="text-xs lg:text-sm text-slate-600 flex items-center gap-1">
                            <FiCalendar className="w-3 h-3" />
                            {new Date(expense.sessionDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm lg:text-base font-semibold text-red-600 flex-shrink-0 ml-3">
                        {expense.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Tips - Mobile Only */}
        {currentSession && (
          <div className="lg:hidden bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
            <div className="flex items-start gap-3">
              <FiTrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1">Quick Tip</h4>
                <p className="text-slate-600 text-xs">
                  Track all your expenses to get better insights into your spending patterns.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracking;