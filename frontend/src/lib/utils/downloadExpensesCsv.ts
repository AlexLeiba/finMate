import type { ArrayExpenseResponseType } from "@/lib/schemas/apis/expenseSchema";

export const downloadExpensesCSV = (expenses: ArrayExpenseResponseType["data"]["expenses"]) => {
  const csvHeader = Object.keys(expenses[0]).join(",");

  const csvRows = expenses
    .map((expense) => [
      expense._id,
      expense.amount,
      expense.category,
      expense.description,
      expense.date,
      expense.createdAt,
      expense.updatedAt,
      expense.userId,
    ])
    .join("\n");

  const csv = new Blob([csvHeader + "\n" + csvRows], { type: "text/csv" });
  const url = URL.createObjectURL(csv);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "expenses.csv");

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
