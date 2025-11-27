import React from "react";

const SessionCard = ({ session, onConclude }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md flex-1">
    <h2 className="text-xl font-semibold mb-4">Active Session</h2>
    <p>
      Income: <span className="font-bold">{session.incomeAmount}</span>
    </p>
    <p>
      Balance Remaining: <span className="font-bold">{session.balance}</span>
    </p>
    <p>
      Expenses: <span className="font-bold">{session.expenses.length}</span>
    </p>
    <button
      onClick={() => onConclude(session._id)}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Conclude Session
    </button>
  </div>
);

export default SessionCard;
