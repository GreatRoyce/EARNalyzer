const sendEmail = require("../utils/mailer");

const analyzeSpendAndSendEmail = async (user, session) => {
  if (!session.expenses || session.expenses.length === 0) return;

  const totalIncome = session.incomeAmount;
  let analysisText = "<h3>Your Spending Analysis</h3><ul>";

  session.expenses.forEach((expense) => {
    const percent = ((expense.amount / totalIncome) * 100).toFixed(2);
    analysisText += `<li>${expense.title} - ${percent}% of your income</li>`;
  });
  analysisText += "</ul>";

  await sendEmail({
    to: user.email,
    subject: "Spending Analysis - Earnalyzer",
    html: analysisText,
  });
};

module.exports = analyzeSpendAndSendEmail;