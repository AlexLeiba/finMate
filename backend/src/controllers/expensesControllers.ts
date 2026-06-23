import { type Request, type Response } from "express";
import { asyncHandler, sendError, sendSuccess } from "../utils/responseHelpers";
import {
  createExpenseSchema,
  getAllExpensesQuerySchema,
  updateExpenseSchema,
} from "../schemas/expenses";
import { DEFAULT_VALIDATION_ERROR_MESSAGE } from "../consts/consts";
import { Expense } from "../models/Expense";

// GET ALL
const getAllExpenses = asyncHandler(async function getAllExpenses(
  req: Request,
  res: Response,
) {
  const userId = req.userId;

  const userExpenses = await Expense.find({ userId });

  if (userExpenses.length === 0) {
    sendSuccess(
      res,
      [],
      "No expenses were found for this user. Create an expense to get started",
      200,
    );
    return;
  }

  const validatedProvidedQuery = getAllExpensesQuerySchema.safeParse(req.query);

  if (!validatedProvidedQuery.success) {
    sendError(
      res,
      JSON.parse(validatedProvidedQuery.error?.message)[0].message ||
        DEFAULT_VALIDATION_ERROR_MESSAGE,
      400,
    );
    return;
  }

  let filteredExpenses = [...userExpenses].filter((expense) => {
    if (validatedProvidedQuery.data.category) {
      return expense.category === validatedProvidedQuery.data.category;
    }

    return expense;
  });

  if (validatedProvidedQuery.data.sort === "amount") {
    filteredExpenses.sort((a, b) => a.amount - b.amount);
  } else if (validatedProvidedQuery.data.sort === "-amount") {
    filteredExpenses.sort((a, b) => b.amount - a.amount);
  } else if (validatedProvidedQuery.data.sort === "date") {
    filteredExpenses.sort((a, b) => a.date.getTime() - b.date.getTime());
  } else if (validatedProvidedQuery.data.sort === "-date") {
    filteredExpenses.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  sendSuccess(res, filteredExpenses, "expenses retrieved successfully", 200);
});

// GET BY ID
const getExpenseById = asyncHandler(async function getSingleExpense(
  req: Request,
  res: Response,
) {
  const { id } = req.params;
  const userId = req.userId;

  if (!id.toString().trim()) {
    sendError(res, "id is required", 400);
    return;
  }
  if (typeof id !== "string") {
    sendError(res, "id must be a string", 400);
    return;
  }

  const expense = (await Expense.findOne({ _id: id, userId }))?.toObject();

  if (!expense) {
    sendError(res, "expense not found", 404);
    return;
  }

  sendSuccess(res, expense, "expenses retrieved successfully", 200);
});

// CREATE
const createExpense = asyncHandler(async function createExpense(
  req: Request,
  res: Response,
) {
  const userId = req.userId;
  const { amount, category, description, date } = req.body;

  if (!amount || !category || !description || !date) {
    sendError(res, "amount, category, description and date are required", 400);

    return;
  }

  const validatedProvidedBody = createExpenseSchema.safeParse(req.body);
  if (!validatedProvidedBody.success) {
    sendError(
      res,
      JSON.parse(validatedProvidedBody?.error?.message)[0].message ||
        DEFAULT_VALIDATION_ERROR_MESSAGE,
      400,
    );
    return;
  }

  const createdExpense = await Expense.create({
    userId: userId,
    amount: validatedProvidedBody.data.amount,
    category: validatedProvidedBody.data.category,
    description: validatedProvidedBody.data.description,
    date: validatedProvidedBody.data.date || new Date(),
  });

  sendSuccess(res, createdExpense, "expenses created successfully", 201);
});

// UPDATE
const updateExpense = asyncHandler(async function updateExpense(
  req: Request,
  res: Response,
) {
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

  const { amount, category, description, date } = req.body;

  if (!amount && !category && !description && !date) {
    sendError(res, "you must provide at least one field", 400);
    return;
  }

  const validatedProvidedBody = updateExpenseSchema.safeParse(req.body);
  console.log(
    "🚀 ~ updateExpense ~ validatedProvidedBody:",
    validatedProvidedBody,
  );

  if (!validatedProvidedBody.success) {
    sendError(
      res,
      JSON.parse(validatedProvidedBody?.error?.message)[0].message ||
        DEFAULT_VALIDATION_ERROR_MESSAGE,
      400,
    );
    return;
  }

  const updatedExpenseObj = {
    ...(validatedProvidedBody.data.amount && {
      amount: validatedProvidedBody.data.amount,
    }),
    ...(validatedProvidedBody.data.category && {
      category: validatedProvidedBody.data.category,
    }),
    ...(validatedProvidedBody.data.description && {
      description: validatedProvidedBody.data.description,
    }),
    ...(validatedProvidedBody.data.date && {
      date: validatedProvidedBody.data.date,
    }),
    updatedAt: new Date(),
  };

  const updatedExpense = await Expense.findOneAndUpdate(
    {
      _id: id,
      userId: userId,
    },
    {
      $set: updatedExpenseObj,
    },
    {
      new: true,
    },
  );

  if (!updatedExpense) {
    sendError(res, "expense not found", 404);
    return;
  }

  sendSuccess(res, updatedExpense, "expense updated successfully", 200);
});

// DELETE
const deleteExpense = asyncHandler(async function deleteExpense(
  req: Request,
  res: Response,
) {
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

  const deletedExpense = (
    await Expense.findOneAndDelete({
      _id: id,
      userId: userId,
    })
  )?.toObject();

  if (!deletedExpense) {
    sendError(res, "expense not found", 404);
    return;
  }

  sendSuccess(res, deletedExpense, "expense deleted successfully", 200);
});

export {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

// TODO add upload/download expenses as csv.
