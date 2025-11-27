const express = require("express");
const {
  getHistory,
  concludeSession,
  getSessionById,
  addExpense,
  createIncomeSession,
  deleteSession,
} = require("../controllers/incomeController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// 🟢 Create new income session
router.post("/create", protect, createIncomeSession);

// 🟡 Add new expense to session
router.post("/:sessionId/add-expense", protect, addExpense);

// 🟣 Get all user income sessions (history)
router.get("/history", protect, getHistory);

// 🔵 Get single income session by ID
router.get("/:sessionId", protect, getSessionById);

// 🔴 Conclude a session (mark as complete)
router.post("/:sessionId/conclude", protect, concludeSession);

router.delete("/:sessionId", protect, deleteSession);

module.exports = router;
