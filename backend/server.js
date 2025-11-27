const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/dbConnection");

// 📘 ApiDoc (Swagger)
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load(path.join(__dirname, "apidoc.yaml"));

// 🌐 Import Routes
const regAndLogin = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const pdfRoute = require("./routes/pdfRoutes");
const adminRoutes = require("./routes/adminRoutes");

// 🔑 Initialize environment variables
dotenv.config();

// 🚀 Initialize express app
const app = express();

// 🎯 Configure CORS (Frontend allowed)
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🛠 Middleware
app.use(express.json());
app.use(morgan("dev"));

// 🗄 Connect to Database
connectDB();

// 🌍 Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Earnalyzer API 🚀",
  });
});

// 📘 Swagger UI Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 📦 API Routes
app.use("/api/v1/auth", regAndLogin);
app.use("/api/v1/income-sessions", incomeRoutes);
app.use("/api/v1/pdf", pdfRoute);
app.use("/api/v1/admin", adminRoutes);

// 🚀 Server Listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📘 API Documentation: http://localhost:${PORT}/api-docs`);
});
