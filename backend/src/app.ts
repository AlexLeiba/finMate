
import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { errorHandler } from "./middleware/errorHandler";
import { sendError, asyncHandler } from "./utils/responseHelpers";
import { requireAuth } from "./middleware/authMiddleware";

import expensesRoutes from "./routes/expensesRoutes";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import budgetsRoutes from "./routes/budgetsRoutes";

import { corsOptions } from "./config/origin";
import { connectDB } from "./config/mongoDBConnection";

const app: Application = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy"
  });
});

// Connect to MongoDB before processing API routes
app.use(
  asyncHandler(async (_req, _res, next) => {
    await connectDB();
    next();
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", requireAuth, expensesRoutes);
app.use("/api/profile", requireAuth, profileRoutes);
app.use("/api/analytics", requireAuth, analyticsRoutes);
app.use("/api/budgets", requireAuth, budgetsRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Hello from the backend" });
});

// 404 handler
app.use((_req, res) => {
  sendError(res, "Route not found", 404);
});

// Global error handler
app.use(errorHandler);

export = app;
