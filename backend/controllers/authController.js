const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  registerValidation,
  loginValidation,
} = require("../validation/UserValidation");
const sendEmail = require("../utils/mailer");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const verificationToken = crypto.randomBytes(20).toString("hex");

    await User.create({
      username,
      email,
      password,
      verificationToken,
      isVerified: false,
    });

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

    return res.status(201).json({
      message: "User created successfully. Please verify your email to log in.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Welcome to Earnalyzer, ${user.username}!</h2>
        <p>Your email has been verified successfully.</p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: "Welcome to Earnalyzer!",
      html: htmlContent,
    });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password +role");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
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
    return res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account with this email" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password/${resetToken}`;
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>You requested a password reset. Send a POST request with your new password to:</p>
        <p>${resetUrl}</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "Password Reset",
      text: `Reset your password by sending a POST request to: ${resetUrl}`,
      html: htmlMessage,
    });

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
};
