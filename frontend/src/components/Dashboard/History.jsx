import React from "react";
import {
  FiDownload,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiFileText,
} from "react-icons/fi";
import CustomButton from "../../components/ui/CustomButtton";

const History = ({ history, onDownloadPDF }) => {
  const concludedSessions = history.filter((session) => session.isConcluded);

  return (
    <div className="flex-1 lg:p-2 overflow-auto ">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-slate-800">
              {history.length}
            </div>
            <div className="text-xs lg:text-sm text-slate-600">
              Total Sessions
            </div>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-green-600">
              {concludedSessions.length}
            </div>
            <div className="text-xs lg:text-sm text-slate-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-blue-600">
              {history.reduce(
                (total, session) => total + session.expenses.length,
                0
              )}
            </div>
            <div className="text-xs lg:text-sm text-slate-600">
              Total Expenses
            </div>
          </div>
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-3 lg:p-4 text-center">
            <div className="text-xl lg:text-2xl font-bold text-purple-600">
              
              {history
                .reduce((total, session) => total + session.incomeAmount, 0)
                .toFixed(2)}
            </div>
            <div className="text-xs lg:text-sm text-slate-600">
              Total Income
            </div>
          </div>
        </div>

        {/* Mobile Session Cards */}
        <div className="lg:hidden space-y-4">
          {history.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
              <FiCalendar className="h-12 w-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No Session History
              </h3>
              <p className="text-slate-600 text-sm">
                Your completed sessions will appear here
              </p>
            </div>
          ) : (
            history.map((session) => (
              <div
                key={session._id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-800">
                      {new Date(session.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      session.isConcluded
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {session.isConcluded ? "Concluded" : "Active"}
                  </span>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FiDollarSign className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-slate-600">Income</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {session.incomeAmount.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FiTrendingUp className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-slate-600">Expenses</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {session.expenses.length}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <FiFileText className="h-3 w-3 text-purple-600" />
                      <span className="text-xs text-slate-600">Balance</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {session.balance.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {session.isConcluded && (
                  <CustomButton
                    title="Download PDF"
                    variant="outline"
                    size="small"
                    handleClick={() => onDownloadPDF(session._id)}
                    styles="w-full"
                    icon={<FiDownload className="w-3 h-3" />}
                  />
                )}
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Income
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Expenses
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Balance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <FiCalendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        No Session History
                      </h3>
                      <p className="text-slate-600">
                        Your completed sessions will appear here
                      </p>
                    </td>
                  </tr>
                ) : (
                  history.map((session) => (
                    <tr
                      key={session._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {session.incomeAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {session.expenses.length}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {session.balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            session.isConcluded
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {session.isConcluded ? "Concluded" : "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {session.isConcluded && (
                          <CustomButton
                            title="Download PDF"
                            variant="outline"
                            size="small"
                            handleClick={() => onDownloadPDF(session._id)}
                            styles="min-w-32"
                            icon={<FiDownload className="w-3 h-3" />}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Empty State */}
        {history.length === 0 && (
          <div className="lg:hidden bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <FiCalendar className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              No Session History
            </h3>
            <p className="text-slate-600 text-sm">
              Your completed sessions will appear here
            </p>
          </div>
        )}

        {/* Mobile Summary */}
        {history.length > 0 && (
          <div className="lg:hidden bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 text-sm">
                History Summary
              </h3>
              <FiFileText className="h-5 w-5 text-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-slate-600">Total Sessions</div>
                <div className="font-semibold text-slate-800">
                  {history.length}
                </div>
              </div>
              <div>
                <div className="text-slate-600">Completed</div>
                <div className="font-semibold text-slate-800">
                  {concludedSessions.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
