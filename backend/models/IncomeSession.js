const mongoose = require("mongoose");

// =======================
// 🧾 INCOME SESSION SCHEMA
// =======================
const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Expense title is required"],
    },
    amount: {
      type: Number,
      required: [true, "Expense amount is required"],
      min: 0,
    },
  },
  { _id: false }
);

const IncomeSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    incomeAmount: {
      type: Number,
      required: [true, "Income amount is required"],
      min: 0,
    },
    expenses: [ExpenseSchema],
    balance: {
      type: Number,
      default: function () {
        return this.incomeAmount;
      },
    },
    isConcluded: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("IncomeSession", IncomeSessionSchema);
