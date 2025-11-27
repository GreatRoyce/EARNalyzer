const IncomeSession = require("../models/IncomeSession");
const analyzeSpendAndSendEmail = require("../utils/spendingAnalysis");

// 🟢 Create new income session
const createIncomeSession = async (req, res) => {
  try {
    const { incomeAmount } = req.body;

    if (!incomeAmount || incomeAmount <= 0) {
      return res
        .status(400)
        .json({ error: "Please enter a valid income amount." });
    }

    const session = await IncomeSession.create({
      user: req.user._id,
      incomeAmount,
      balance: incomeAmount,
    });

    res
      .status(201)
      .json({ message: "Income session created successfully", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 🟡 Add expense to session
const addExpense = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { title, amount } = req.body;

    if (!title || !amount || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Please enter a valid title and amount." });
    }

    const session = await IncomeSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ error: "Income session not found." });
    }

    const newBalance = session.balance - amount;
    if (newBalance < 0) {
      return res
        .status(400)
        .json({ error: "Insufficient balance for this expense." });
    }

    session.expenses.push({ title, amount });
    session.balance = newBalance;

    await session.save();

    res.status(200).json({
      message: "Expense added successfully",
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 🟣 Fetch income session history
const getHistory = async (req, res) => {
  try {
    const sessions = await IncomeSession.find({ user: req.user._id });
    res.status(200).json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔵 Conclude session (mark as completed)
const concludeSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await IncomeSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ error: "Income session not found." });
    }

    session.isConcluded = true;
    await session.save();

    analyzeSpendAndSendEmail(req.user, session);

    res.status(200).json({
      message: "Income session concluded successfully.",
      session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔴 Get single session by ID
const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await IncomeSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ error: "Income session not found." });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔴 Delete income session
const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await IncomeSession.findOneAndDelete({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ error: "Income session not found." });
    }

    res.status(200).json({ message: "Session deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  createIncomeSession,
  addExpense,
  getHistory,
  concludeSession,
  getSessionById,
  deleteSession
};
