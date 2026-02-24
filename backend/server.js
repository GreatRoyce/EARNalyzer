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
const swaggerDocument = YAML.load(
  path.join(__dirname, "apidoc.yaml")
);

/* ===============================
   CORS CONFIGURATION (FIXED)
================================ */

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://earnalyzer.vercel.app",
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (origin.endsWith(".vercel.app")) return true;
  return false;
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(isAllowedOrigin(origin) ? 204 : 403);
  }

  return next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, curl)
      if (!origin) return callback(null, true);

      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS not allowed for origin: ${origin}`)
      );
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* ===============================
   MIDDLEWARE
================================ */

app.use(express.json());
app.use(morgan("dev"));

/* ===============================
   ROUTES
================================ */

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Earnalyzer API" });
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/api/v1/auth", regAndLogin);
app.use("/api/v1/income-sessions", incomeRoutes);
app.use("/api/v1/pdf", pdfRoute);
app.use("/api/v1/admin", adminRoutes);

/* ===============================
   ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).json({
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    message: "Internal server error",
  });
});

/* ===============================
   SERVER START
================================ */

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `API Docs: http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
