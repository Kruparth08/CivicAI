const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const issueRoutes = require("./routes/issueRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Security Middleware
app.use(helmet());
app.use(compression());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// Apply Rate Limiter
app.use("/api/auth", apiLimiter);
app.use("/api/ai", apiLimiter);

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Body Parser
app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CivicAI Backend Running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/ai", aiRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;