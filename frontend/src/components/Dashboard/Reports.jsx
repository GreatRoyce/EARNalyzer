import React from "react";
import { FiDownload, FiFileText, FiCalendar } from "react-icons/fi";
import CustomButton from "../../components/ui/CustomButtton";

const Reports = ({ history, onDownloadPDF }) => {
  const concludedSessions = history.filter((session) => session.isConcluded);

  return (
    <div className="flex-1 p-4 lg:p-6 overflow-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}

        {/* Available Reports */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-4 lg:p-6 mb-6">
          <h2 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <FiFileText className="text-blue-500" />
            Available Reports
          </h2>

          {concludedSessions.length === 0 ? (
            <div className="text-center py-8">
              <FiFileText className="h-12 w-12 lg:h-16 lg:w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-2">
                No Reports Available
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Complete some sessions to generate reports
              </p>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {concludedSessions.map((session) => (
                <div
                  key={session._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border border-slate-200 rounded-lg lg:rounded-xl hover:bg-slate-50 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 lg:p-3 bg-blue-100 rounded-lg lg:rounded-xl flex-shrink-0">
                      <FiCalendar className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900 text-sm lg:text-base truncate">
                        Session Report -{" "}
                        {new Date(session.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs lg:text-sm text-slate-600 flex flex-wrap gap-1 lg:gap-2">
                        <span>{session.incomeAmount.toFixed(2)} Income</span>
                        <span>•</span>
                        <span>{session.expenses.length} Expenses</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-full sm:w-auto">
                    <CustomButton
                      title="Download PDF"
                      variant="success"
                      size="small"
                      handleClick={() => onDownloadPDF(session._id)}
                      styles="w-full sm:w-auto shadow-sm lg:shadow-md"
                      icon={<FiDownload className="w-3 h-3 lg:w-4 lg:h-4" />}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Report Summary & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Report Statistics */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-4 lg:p-6">
            <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 text-base lg:text-lg">
              Report Statistics
            </h3>
            <div className="space-y-2 lg:space-y-3">
              <div className="flex justify-between items-center py-1 lg:py-2 border-b border-slate-100">
                <span className="text-slate-600 text-sm lg:text-base">
                  Total Reports
                </span>
                <span className="font-semibold text-slate-900 text-sm lg:text-base">
                  {concludedSessions.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 lg:py-2 border-b border-slate-100">
                <span className="text-slate-600 text-sm lg:text-base">
                  Available for Download
                </span>
                <span className="font-semibold text-slate-900 text-sm lg:text-base">
                  {concludedSessions.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 lg:py-2">
                <span className="text-slate-600 text-sm lg:text-base">
                  Total Income Tracked
                </span>
                <span className="font-semibold text-slate-900 text-sm lg:text-base">
                  
                  {concludedSessions
                    .reduce((sum, session) => sum + session.incomeAmount, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className=" hidden bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-slate-200 p-4 lg:p-6">
            <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 text-base lg:text-lg">
              Quick Actions
            </h3>
            <div className="space-y-2 lg:space-y-3">
              <button className="w-full text-left p-3 border border-slate-200 rounded-lg lg:rounded-xl hover:bg-slate-50 transition-colors text-sm lg:text-base">
                Generate Monthly Summary
              </button>
              <button className="w-full text-left p-3 border border-slate-200 rounded-lg lg:rounded-xl hover:bg-slate-50 transition-colors text-sm lg:text-base">
                Export All Data
              </button>
              <button className="w-full text-left p-3 border border-slate-200 rounded-lg lg:rounded-xl hover:bg-slate-50 transition-colors text-sm lg:text-base">
                Custom Report
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Quick Stats Banner */}
        {concludedSessions.length > 0 && (
          <div className="lg:hidden bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">
                  {concludedSessions.length} Reports Ready
                </h3>
                <p className="text-slate-600 text-xs">
                  Download your session reports
                </p>
              </div>
              <FiFileText className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
