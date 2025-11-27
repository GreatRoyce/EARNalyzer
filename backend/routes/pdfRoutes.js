const express = require("express");
const router = express.Router();
const generateSessionPDF = require("../controllers/pdfController");
const protect = require("../middlewares/authMiddleware");

router.get("/:sessionId", protect, generateSessionPDF);

module.exports = router;
