import { type Request, type Response } from "express";
import { asyncHandler, sendError, sendSuccess } from "../utils/responseHelpers";
import { Budget } from "../models/Budget";
import { budgetOptionsSchema, budgetQuerySchema, budgetSchema } from "../schemas/budgets";

const getAllBudgets = asyncHandler(async function getAllBudgets(req: Request, res: Response) {
  const userId = req.userId;

  if (!userId) {
    sendError(res, "User not found", 404);
    return;
  }

  const validatedProvidedQuery = budgetQuerySchema.safeParse(req.query);

  if (!validatedProvidedQuery.success) {
    sendError(
      res,
      JSON.parse(validatedProvidedQuery.error?.message)[0].message || "Invalid query",
      400
    );
    return;
  }

  const budgets = await Budget.find({ userId, budgetType: validatedProvidedQuery.data.budgetType });

  if (budgets?.length === 0) {
    sendSuccess(res, [], "No budgets were found for this user", 200);
    return;
  }

  if (budgets?.length > 0) {
    sendSuccess(res, budgets, "budgets retrieved successfully", 200);
    return;
  }

  sendError(res, "Something went wrong", 500);
});

const getBudgetById = asyncHandler(async function getBudgetById(req: Request, res: Response) {
  const { id } = req.params;
  const userId = req.userId;

  if (!id) {
    sendError(res, "id is required", 400);
    return;
  }
  if (typeof id !== "string") {
    sendError(res, "id must be a string", 400);
    return;
  }

  const budget = (await Budget.findOne({ _id: id, userId: userId }))?.toObject();

  if (!budget) {
    sendError(res, "budget not found", 404);
    return;
  }
  sendSuccess(res, budget, "budget retrieved successfully", 200);
});

const createBudget = asyncHandler(async function createBudget(req: Request, res: Response) {
  const userId = req.userId;

  if (!userId) {
    sendError(res, "User not found", 404);
    return;
  }
  const { title } = req.body;

  if (!title) {
    sendError(res, "title is required", 400);
    return;
  }

  const validatedProvidedBody = budgetSchema.safeParse(req.body);

  if (!validatedProvidedBody.success) {
    sendError(
      res,
      JSON.parse(validatedProvidedBody.error?.message)[0].message || "Invalid query",
      400
    );
    return;
  }

  const createdBudget = await Budget.create({
    userId: userId,
    title: validatedProvidedBody.data.title,
    budgetType: validatedProvidedBody.data.budgetType,
    budgetTargetAmount: validatedProvidedBody.data?.budgetTargetAmount || 0,
    date: validatedProvidedBody.data.date || new Date(),
    description: validatedProvidedBody.data.description || "",
  });

  if (!createdBudget) {
    sendError(res, "Something went wrong", 500);
    return;
  }

  sendSuccess(res, createdBudget, "budget created successfully", 201);
});

const updateBudget = asyncHandler(async function updateBudget(req: Request, res: Response) {
  const userId = req.userId;
  const { id } = req.params;

  if (!id) {
    sendError(res, "id is required", 400);
    return;
  }
  if (typeof id !== "string") {
    sendError(res, "id must be a string", 400);
    return;
  }

  if (!userId) {
    sendError(res, "User not found", 404);
    return;
  }
  const { title } = req.body;
  console.log("🚀 ~ updateBudget ~ req.body:", req.body);

  if (!title) {
    console.log("🚀 ~ updateBudget ~ title:", title);
    sendError(res, "title is required", 400);
    return;
  }

  const validatedProvidedBody = budgetSchema.safeParse(req.body);
  console.log("🚀 ~ updateBudget ~ validatedProvidedBody:", validatedProvidedBody);

  if (!validatedProvidedBody.success) {
    sendError(
      res,
      JSON.parse(validatedProvidedBody.error?.message)[0].message || "Invalid query",
      400
    );
    return;
  }

  const updatedBudget = await Budget.findOneAndUpdate(
    { _id: req.params.id, userId: userId },
    {
      userId: userId,
      title: validatedProvidedBody.data.title,
      budgetType: validatedProvidedBody.data.budgetType,
      budgetTargetAmount: validatedProvidedBody.data?.budgetTargetAmount,
      date: validatedProvidedBody.data.date,
      description: validatedProvidedBody.data.description,
    },
    {
      new: true,
    }
  );

  if (!updatedBudget) {
    sendError(res, "Something went wrong", 500);
    return;
  }

  sendSuccess(res, updatedBudget, "budget updated successfully", 200);
});
const updateBudgetOptions = asyncHandler(async function updateBudget(req: Request, res: Response) {
  const userId = req.userId;
  const { id } = req.params;

  if (!id) {
    sendError(res, "id is required", 400);
    return;
  }
  if (typeof id !== "string") {
    sendError(res, "id must be a string", 400);
    return;
  }

  if (!userId) {
    sendError(res, "User not found", 404);
    return;
  }

  const validatedProvidedBody = budgetOptionsSchema.safeParse(req.body);

  if (!validatedProvidedBody.success) {
    sendError(
      res,
      JSON.parse(validatedProvidedBody.error?.message)[0].message || "Invalid query",
      400
    );
    return;
  }

  const updatedBudget = await Budget.updateOne(
    { _id: req.params.id, userId: userId },
    {
      options: validatedProvidedBody.data,
    }
  );

  if (!updatedBudget) {
    sendError(res, "Something went wrong", 500);
    return;
  }

  sendSuccess(res, updatedBudget, "budget updated successfully", 200);
});

const deleteBudget = asyncHandler(async function deleteBudget(req: Request, res: Response) {
  const userId = req.userId;
  const { id } = req.params;

  if (!id) {
    sendError(res, "id is required", 400);
    return;
  }
  if (typeof id !== "string") {
    sendError(res, "id must be a string", 400);
    return;
  }

  if (!userId) {
    sendError(res, "User not found", 404);
    return;
  }

  const deletedBudget = await Budget.deleteOne({ _id: req.params.id, userId: userId });

  if (!deletedBudget) {
    sendError(res, "Something went wrong", 500);
    return;
  }

  sendSuccess(res, deletedBudget, "Budget deleted successfully", 200);
});

export {
  getAllBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
  updateBudgetOptions,
};
