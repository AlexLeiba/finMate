import { Router } from "express";
import {
  getCategoriesBreakdown,
  getMonthlyTotalsOfOneYear,
  getDashboardStats,
  getSpendingTrends,
} from "../controllers/analyticsControllers";

// route definitions
const router = Router();

router.get("/categories", getCategoriesBreakdown);
router.get("/monthly", getMonthlyTotalsOfOneYear);
router.get("/dashboard", getDashboardStats);
router.get("/trends", getSpendingTrends);

export default router;
