import type { FilterExpenseFormDataType } from "../schemas/forms/filterExpenseSchema";

export function generateActiveFilterPayload(
  filters: FilterExpenseFormDataType,
): FilterExpenseFormDataType {
  const payload = Object.entries(filters).reduce(
    (acc, [key, value]): Record<string, unknown> => {
      if (value) {
        if (!acc[key]) {
          acc[key] = value;
        }
        acc[key] = value;
      }

      return acc;
    },
    {},
  );

  return payload;
}
