const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/dbConnection");

// Import Routes
const regAndLogin = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const pdfRoute = require("./routes/pdfRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();

// ✅ Configure CORS to allow frontend on port 5178
app.use(
  cors({
    origin: ["http://localhost:5173"], // your frontend port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies/auth headers if needed
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect Database
connectDB();

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Earnalyzer API 🚀",
  });
});

// API Routes
app.use("/api/v1/auth", regAndLogin);
app.use("/api/v1/income-sessions", incomeRoutes);
app.use("/api/v1/pdf", pdfRoute);
app.use("/api/v1/admin", adminRoutes);

// Server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
