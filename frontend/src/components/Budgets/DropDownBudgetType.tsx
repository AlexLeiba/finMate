import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { ExpenseCategory } from "@/lib/types/expense.types";
import { cn } from "@/lib/utils/tailwindUtils";
import { Button } from "@/components/ui/button";
import { BUDGET_TYPE } from "@/lib/consts/budgets";
import type { BudgetType } from "@/store/useBudgetsStore";

export function DropDownBudgetType({ disabled, name }: { disabled: boolean; name: string }) {
  const { control, setValue } = useFormContext();

  function handleSetValue(category: BudgetType) {
    setValue(name, category);
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={ExpenseCategory.ALL}
      render={({ field: { onChange, value } }) => {
        return (
          <DropdownMenu modal={false}>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Budget Type
              </p>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className="w-full justify-between"
                  classNameChildren="flex items-center justify-between"
                >
                  {BUDGET_TYPE.find((budget) => budget.value === value)?.label}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-56">
              {BUDGET_TYPE.map((category) => (
                <DropdownMenuItem
                  className={cn(value === category && "bg-primary text-text-primary")}
                  key={category.value}
                  onClick={() => {
                    onChange(category);
                    handleSetValue(category.value);
                  }}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }}
    />
  );
}
