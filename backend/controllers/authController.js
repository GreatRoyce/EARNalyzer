const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  registerValidation,
  loginValidation,
} = require("../validation/UserValidation");
const sendEmail = require("../utils/mailer");

// Generate JWT including role
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Welcome to Earnalyzer, ${user.username}!</h2>
      <p>Thank you for registering. You can now track your income and expenses, and get AI-powered insights to manage your money better.</p>
      <p>Happy budgeting! 💰</p>
    </div>
  `;
  await sendEmail({
    to: user.email,
    subject: "Welcome to Earnalyzer!",
    html: htmlContent,
  });
};

// REGISTER
const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, email, password, role, adminSecret } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: "Email already exists" });

    const verificationToken = crypto.randomBytes(20).toString("hex");

    // Determine role safely
    let userRole = "user"; // default
    if (role === "admin") {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ error: "Unauthorized to create admin" });
      }
      userRole = "admin";
    }

    user = await User.create({
      username,
      email,
      password,
      verificationToken,
      isVerified: true, // mark verified immediately
      role: userRole,
    });

    // Generate JWT token including role
    const token = generateToken(user._id, user.role);

    // HTML Verification Email
    const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${verificationToken}`;
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Hello, ${username}!</h2>
        <p>Verify your email by clicking the button below:</p>
        <a href="${verificationUrl}" style="display:inline-block;padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Verify Email</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
      </div>
    `;
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      text: `Verify your email by visiting: ${verificationUrl}`,
      html: htmlMessage,
    });

    // Send Welcome Email
    await sendWelcomeEmail(user);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });
    if (!user)
      return res
        .status(404)
        .json({ error: "Invalid or expired verification token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password +role");

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });
    if (!user.isVerified)
      return res.status(401).json({ error: "Email not verified" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "No account with this email" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password/${resetToken}`;
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>You requested a password reset. Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;border-radius:5px;">Reset Password</a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${resetUrl}</p>
      </div>
    `;
    await sendEmail({
      to: email,
      subject: "Password Reset",
      text: `Reset your password by visiting: ${resetUrl}`,
      html: htmlMessage,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
};
