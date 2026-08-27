import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/tailwindUtils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import * as z from "zod";

const uploadNewExpensesSchema = z.object({
  description: z.string().min(1),
  date: z.date().default(new Date()),
  category: z.string().min(1),
  amount: z.string().min(1),
});

export function AddNewExpenseDropdown({
  rows,
  title,
  handleSelectValue,
}: {
  rows: string[];
  title: string;
  handleSelectValue: (index: number, key: string, value: any) => void;
}) {
  // const [selectedValue, setSelectedValue] = useState<{ [key: string]: string }>({});

  // function handleSelectValue(key: string, value: string) {
  //   setSelectedValue((prev) => ({ ...prev, [key]: value }));
  // }
  return (
    <div>
      <DropdownMenu modal={false}>
        <div className="flex flex-col gap-1">
          <DropdownMenuTrigger asChild>
            <Button
              // disabled={disabled}
              variant={"outline"}
              className="w-full justify-between"
              classNameChildren="flex items-center justify-between"
            >
              {rows[0]}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="w-56 flex flex-col gap-1">
          {rows?.map((value, index) => (
            <DropdownMenuItem
              className={cn("bg-primary text-text-primary")}
              key={value + index}
              onClick={() => handleSelectValue(index + 1, title, value)}
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
