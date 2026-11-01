import type { ExpenseFiltersType } from "../types/expense.types";

export function parseActiveFilters(
  filter: ExpenseFiltersType[keyof ExpenseFiltersType],
  type: keyof ExpenseFiltersType,
): ExpenseFiltersType[keyof ExpenseFiltersType] {
  if (type === "sort") {
    switch (filter) {
      case "date":
        return "sort by date: ↑";
      case "-date":
        return "sort by date: ↓";
      case "amount":
        return "sort by amount: ↑";
      case "-amount":
        return "sort by amount: ↓";
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
