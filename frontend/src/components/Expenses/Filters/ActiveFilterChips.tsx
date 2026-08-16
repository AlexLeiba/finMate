import type { ExpenseFilterKeys } from "@/lib/types/expense.types";
import { cn } from "@/lib/utils/tailwindUtils";

export function ActiveFilterChips({ value, title }: { value: string; title: ExpenseFilterKeys }) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 border p-1 px-2 rounded-md bg-background-element-accent",
          (title === "category" || title === "sort") && "bg-background-primary"
        )}
      >
        {value}
      </div>
    </div>
  );
}
