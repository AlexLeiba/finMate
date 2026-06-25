import type { ExpenseFiltersType } from "../types/expense.types";

export function parseActiveFilters(
  filter: ExpenseFiltersType[keyof ExpenseFiltersType],
  type: keyof ExpenseFiltersType,
): ExpenseFiltersType[keyof ExpenseFiltersType] {
  if (type === "sort") {
    switch (filter) {
      case "date":
        return "by date: asc";
      case "-date":
        return "by date: desc";
      case "amount":
        return "by amount: asc";
      case "-amount":
        return "by amount: desc";
      default:
        return filter;
    }
  }
  if (filter instanceof Date) {
    return type === "startDate"
      ? `from: ${filter.toLocaleDateString()}`
      : `to: ${filter.toLocaleDateString()}`;
  }
  if (type === "searchTerm") {
    return `search: ${filter}`;
  }
  if (type === "category") {
    return `category: ${filter}`;
  }
  if (type === "minAmount") return `min: ${filter}`;
  if (type === "maxAmount") return `max: ${filter}`;
  if (typeof filter === "string" || typeof filter === "number") {
    return filter;
  }

  return filter;
}
