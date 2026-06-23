import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { ExpenseCategory } from "@/lib/types/expense.types";
import { CATEGORIES } from "@/lib/consts/categories";
import { cn } from "@/lib/utils/tailwindUtils";

export function DropDown({
  disabled,
  name,
}: {
  disabled: boolean;
  name: string;
}) {
  const { control, setValue } = useFormContext();

  function handleSetCategory(category: ExpenseCategory) {
    setValue(name, category);
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <DropdownMenu modal={false}>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Category
              </p>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className="w-full justify-between"
                  classNameChildren="flex items-center justify-between"
                >
                  {CATEGORIES[value as ExpenseCategory]}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-56">
              {Object.values(ExpenseCategory).map((category) => (
                <DropdownMenuItem
                  className={cn(
                    value === category && "bg-primary text-text-primary",
                  )}
                  key={category}
                  onClick={() => {
                    onChange(category);
                    handleSetCategory(category);
                  }}
                >
                  {CATEGORIES[category as ExpenseCategory]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }}
    />
  );
}
