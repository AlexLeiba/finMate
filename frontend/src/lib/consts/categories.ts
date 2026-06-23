import type { ExpenseCategory } from "../types/expense.types";

export const CATEGORIES: Record<ExpenseCategory, string> = {
  all: "All",
  transport: "🛻 Transport",
  utilities: "💡  Utilities",
  entertainment: "🎥 Entertainment",
  healthcare: "💊 Healthcare",
  shopping: "🛒 Shopping ",
  education: "📖 Education",
  groceries: "🍎 Groceries",
  food: "🍔 Food",
  drinks: "🍵 Drinks",
  other: "other",
};
