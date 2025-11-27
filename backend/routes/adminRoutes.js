const express = require("express");
const {
  getAllUsers,
  getAllSessions,
} = require("../controllers/adminController");
const protect = require("../middlewares/authMiddleware");
const adminProtect = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/sessions", protect, getAllSessions);

module.exports = router;
