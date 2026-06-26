import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/tailwindUtils";
import { ExpenseCategory } from "@/lib/types/expense.types";
import { CATEGORIES } from "@/lib/consts/categories";

const colorVariants = cva("rounded-sm py-1 px-2 relative overflow-hidden", {
  variants: {
    category: {
      [ExpenseCategory.OTHER]:
        "bg-gray-900 border-gray-800 border text-gray-300",
      [ExpenseCategory.DRINKS]:
        "bg-purple-900  border-purple-800 border text-purple-300",
      [ExpenseCategory.FOOD]:
        "bg-green-900 border-green-800 border text-green-300",
      [ExpenseCategory.GROCERIES]:
        "bg-green-900 border-green-800 border text-green-300",
      [ExpenseCategory.EDUCATION]:
        "bg-yellow-900 border-yellow-800 border text-yellow-300",
      [ExpenseCategory.ENTERTAINMENT]:
        "bg-pink-900 border-pink-800 border text-pink-300",
      [ExpenseCategory.HEALTHCARE]:
        "bg-green-900 border-green-800 border text-green-300",
      [ExpenseCategory.SHOPPINHG]:
        "bg-purple-900 border-purple-800 border text-purple-300",
      [ExpenseCategory.TRANSPORT]:
        "bg-blue-900 border-blue-800 border text-blue-300",
      [ExpenseCategory.UTILITIES]:
        "bg-yellow-900 border-yellow-800 border text-yellow-300",
    },
  },
});

type ColorVariants = VariantProps<typeof colorVariants>;
export function Category({ category }: { category: ExpenseCategory }) {
  return (
    <span
      className={cn(
        colorVariants({ category: category as ColorVariants["category"] }),
      )}
    >
      <div className="opacity-50 bg-black z-10 absolute top-0 left-0 right-0 bottom-0" />
      <p className="z-20 opacity-100 relative">{CATEGORIES[category]}</p>
    </span>
  );
}
