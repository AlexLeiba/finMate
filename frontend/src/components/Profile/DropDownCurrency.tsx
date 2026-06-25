import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwindUtils";
import { CURRENCIES, type CurrencyType } from "@/lib/consts/currency";

export function DropDownCurrency({
  disabled,
  name,
}: {
  disabled: boolean;
  name: string;
}) {
  const { control, setValue } = useFormContext();

  function handleSetValue(category: CurrencyType) {
    setValue(name, category);
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={CURRENCIES[0].value}
      render={({ field: { onChange, value } }) => {
        return (
          <DropdownMenu modal={false}>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Currency
              </p>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className="w-full justify-between"
                  classNameChildren="flex items-center justify-between"
                >
                  {
                    CURRENCIES.find((currency) => currency.value === value)
                      ?.label
                  }
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-56">
              {CURRENCIES.map((category) => (
                <DropdownMenuItem
                  className={cn(
                    value === category && "bg-primary text-text-primary",
                  )}
                  key={category.value}
                  onClick={() => {
                    onChange(category);
                    handleSetValue(category.value as CurrencyType);
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
