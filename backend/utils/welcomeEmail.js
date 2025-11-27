const sendEmail = require("../utils/mailer");

const sendWelcomeEmail = async (user) => {
  const htmlContent = `
    <h2>Welcome to Earnalyzer!</h2>
    <p>Thank you for registering. You can now track your income and expenses. And get AI-powered insights to manage your money better</p>
    <p>
    Happy budgeting! 💰</p>
    
    `;
  await sendEmail({
    to: user.email,
    subject: "Welcome to Earnalyzer",
    html: htmlContent,
  });
};

module.exports = sendEmail;
