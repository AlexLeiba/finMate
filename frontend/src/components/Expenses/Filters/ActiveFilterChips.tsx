import type { ExpenseFilterKeys } from "@/lib/types/expense.types";
import { cn } from "@/lib/utils/tailwindUtils";
import { X } from "lucide-react";

export function ActiveFilterChips({
  value,
  title,
  handleRemove,
}: {
  value: string;
  title: ExpenseFilterKeys;
  handleRemove: () => void;
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-1 border p-1 px-2 rounded-md bg-background-element-accent",
          (title === "category" || title === "sort") && "bg-background-primary"
        )}
      >
        {value}
      </div>
      {title !== "category" && title !== "sort" && (
        <button
          aria-label="Remove filter"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove?.();
          }}
          className="opacity-30 bg-black p-1 hover:opacity-100 rounded-full cursor-pointer absolute -right-2 -top-2"
        >
          <X className="size-3 text-white" />
        </button>
      )}
    </div>
  );
}
