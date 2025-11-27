const User = require("../models/User");
const incomeSession = require("../models/IncomeSession");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllSessions = async (req, res) => {
  try {
    const sessions = await incomeSession
      .find()
      .populate("user", "username email");
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  getAllSessions,
};
