const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/dbConnection");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const regAndLogin = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const pdfRoute = require("./routes/pdfRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, "apidoc.yaml"));

const allowedOrigins = [
  "http://localhost:5173",
  "https://earnalyzer.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error("CORS policy does not allow this origin."),
          false,
        );
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Earnalyzer API" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", regAndLogin);
app.use("/api/v1/income-sessions", incomeRoutes);
app.use("/api/v1/pdf", pdfRoute);
app.use("/api/v1/admin", adminRoutes);

app.use((err, req, res, next) => {
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
