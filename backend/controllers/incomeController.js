const IncomeSession = require("../models/IncomeSession");
const analyzeSpendAndSendEmail = require("../utils/spendingAnalysis");

const createIncomeSession = async (req, res) => {
  try {
    const { incomeAmount } = req.body;
    const parsedIncome = Number(incomeAmount);

    if (!parsedIncome || parsedIncome <= 0) {
      return res
        .status(400)
        .json({ message: "Please enter a valid income amount." });
    }

    const session = await IncomeSession.create({
      user: req.user._id,
      incomeAmount: parsedIncome,
      balance: parsedIncome,
    });

    return res
      .status(201)
      .json({ message: "Income session created successfully", session });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const addExpense = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { title, amount } = req.body;
    const parsedAmount = Number(amount);

    if (!title || !parsedAmount || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Please enter a valid title and amount." });
    }

    const session = await IncomeSession.findOneAndUpdate(
      {
        _id: sessionId,
        user: req.user._id,
        isConcluded: false,
        balance: { $gte: parsedAmount },
      },
      {
        $push: { expenses: { title, amount: parsedAmount } },
        $inc: { balance: -parsedAmount },
      },
      { new: true, runValidators: true }
    );

    if (!session) {
      return res.status(400).json({
        message:
          "Unable to add expense. Session may be missing, concluded, or have insufficient balance.",
      });
    }

    return res.status(200).json({
      message: "Expense added successfully",
      session,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getHistory = async (req, res) => {
  try {
    const sessions = await IncomeSession.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ sessions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const concludeSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await IncomeSession.findOneAndUpdate(
      {
        _id: sessionId,
        user: req.user._id,
        isConcluded: false,
      },
      { $set: { isConcluded: true } },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Income session not found." });
    }

    analyzeSpendAndSendEmail(req.user, session).catch((err) => {
      console.error("Spending analysis email failed:", err);
    });

    return res.status(200).json({
      message: "Income session concluded successfully.",
      session,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await IncomeSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ message: "Income session not found." });
    }

    return res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await IncomeSession.findOneAndDelete({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ message: "Income session not found." });
    }

    return res.status(200).json({ message: "Session deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createIncomeSession,
  addExpense,
  getHistory,
  concludeSession,
  getSessionById,
  deleteSession,
};
