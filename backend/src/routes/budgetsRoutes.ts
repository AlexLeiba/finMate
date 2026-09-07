import { Router } from "express";
import {
  createBudget,
  deleteBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  updateBudgetOptions,
} from "../controllers/budgetsControllers.js";

const router = Router(); //creating mini express app for this specific route

router.get("/", getAllBudgets);
router.get("/:id", getBudgetById);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);
router.delete("/options/:id", updateBudgetOptions);

export default router;
