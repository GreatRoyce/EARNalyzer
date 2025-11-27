// backend/utils/sendEmail.js

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const port = parseInt(process.env.EMAIL_PORT) || 465; // default to 465 for SSL
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: port,
  secure: port === 465, // true for SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  tls: {
    rejectUnauthorized: false, // prevents TLS handshake errors
  },
});

// Optional: verify transporter connection
transporter.verify((err, success) => {
  if (err) {
    console.error("Mailer connection error:", err);
  } else {
    console.log("Mailer is ready to send messages!");
  }
});

/**
 * sendEmail
 * Sends an email with text or HTML content.
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} [options.text] - Plain text content
 * @param {string} [options.html] - HTML content
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"Earnalyzer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`✅ Email successfully sent to ${to}`);
  } catch (err) {
    console.error(`⚠️ Error sending email to ${to}:`, err.message);
    // Do NOT throw error — ensures registration/login continues
  }
};

module.exports = sendEmail;
