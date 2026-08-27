import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { lazy, Suspense, useRef, useState, type ChangeEvent } from "react";
import { SkeletonForm } from "../../Expenses/SkeletonForm";
import { Download } from "lucide-react";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils/tailwindUtils";
import { CATEGORY_TIME_PERIOD } from "@/lib/consts/dashboard";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useShallow } from "zustand/react/shallow";
import { apiFactory } from "@/api/services/apiFactory";
import { AddNewExpenseDropdown } from "@/components/Profile/UploadCsv/AddNewExpenseDropdown";

const GenerateExpenseForm = lazy(() =>
  import("./GenerateExpenseForm").then((module) => ({
    default: module.GenerateExpenseForm,
  }))
);

import * as z from "zod";

const uploadNewExpensesSchema = z.object({
  description: z.string().min(1).optional(),
  date: z.coerce.date().optional(),
  category: z.string().min(1).optional(),
  amount: z.coerce.number().min(1).optional(),
});

// PSEUDOCODE
// 1 dropdown to select  value associated to the key
// EX: description: [dropdown value]
// IF a value from dropdown has already been selected, then the value will be removed from it (to prevent reusing again)
// for date key: check if the value is a valid date, if not then add current date.

export function GenerateExpensesModal() {
  const [expenses, setExpenses] = useState<any[][]>([[]]);
  const [headers, setHeaders] = useState<string[]>([]);

  const ref = useRef<HTMLInputElement>(null);
  function handleUpload() {
    ref.current?.click();
  }
  async function handleUploadChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    if (!e.target.files) return;
    if (e.target.files[0].type !== "text/csv") return toast.error("Please upload a csv file");

    try {
      const response = await apiFactory().getAllExpenses();

      setHeaders(Object.keys(response.expenses[0]));
    } catch (error: unknown) {
      toast.error(error as string);
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csv = reader.result as string;
      const csvToJson = csv.split("\n").map((line) => line.split(","));
      const csvRows = csvToJson.slice(1);
      setExpenses(csvRows);
    };
  }

  const [selectedValues, setSelectedValues] = useState<Record<string, { [key: string]: any }>>({});
  const [errors, setErrors] = useState<Record<string, { [key: string]: any }>>({});
  console.log("🚀 ~ GenerateExpensesModal ~ errors:", errors);
  console.log("🚀 ~ handleSelectValue ~ selectedValues:", selectedValues);

  function handleSelectValue(index: number, key: string, value: any) {
    // validate vlues before saving;

    const validatedValues = uploadNewExpensesSchema.safeParse({ [key]: value });
    console.log("🚀 ~ handleSelectValue ~ validatedValues:>>>>>>>>", validatedValues);

    if (!validatedValues.success) {
      const errorMessage = JSON.parse(validatedValues.error.message)?.[0]?.message;
      setErrors((prev) => ({ ...prev, [index]: { ...prev[index], [key]: errorMessage } }));
      return;
    }
    setErrors((prev) => ({ ...prev, [index]: { ...prev[index], [key]: "" } }));

    setSelectedValues((prev) => ({ ...prev, [index]: { ...prev[index], [key]: value } }));
  }
  const EXCLUDED_KEYS = ["createdAt", "updatedAt", "userId", "_id"];

  function handleSubmit() {
    // whould collect an array of each obj, on submit I would validate all of them again before saving it.
    // validate also on select
  }
  return (
    <>
      <input ref={ref} type="file" className="hidden" onChange={(e) => handleUploadChange(e)} />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={handleUpload}
            variant="accent"
            classNameChildren="flex items-center gap-1"
            className="self-start"
          >
            <Download /> Upload data
          </Button>
        </DialogTrigger>

        <DialogContent className="lg:max-w-800 overflow-y-auto  h-full">
          <h4 className="text-lg font-semibold">Upload new expenses</h4>
          <Suspense fallback={<SkeletonForm className="lg:h-98.5" />}>
            {/* <GenerateExpenseForm /> */}
            {/* TODO: for category dropdown: will provide my list of categories */}
            {/* TODO: for date: will check type of date, otherwise will add current date */}

            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                {expenses?.slice(1).map((rows, indexExpense) => {
                  return (
                    <div
                      className="flex flex-col gap-4 border rounded-md px-4 py-2 overflow-y-hidden overflow-x-auto"
                      key={expenses[0][indexExpense] + indexExpense}
                    >
                      <p>{indexExpense + 1}:</p>
                      {rows?.map((value, indexDropdown) => {
                        if (EXCLUDED_KEYS.includes(headers[indexDropdown])) return null;
                        return (
                          <div className="flex flex-col ">
                            <div className="flex items-center gap-1 " key={value + indexDropdown}>
                              <p>
                                {headers[indexDropdown]?.substring(0, 1).toUpperCase() +
                                  headers[indexDropdown]?.substring(1)}
                                :
                              </p>

                              <DropdownMenu modal={false}>
                                <div className="flex flex-col gap-1">
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      // disabled={disabled}
                                      variant={"outline"}
                                      className="w-full justify-between"
                                      classNameChildren="flex items-center justify-between"
                                    >
                                      {selectedValues?.[indexExpense + 1]?.[
                                        headers?.[indexDropdown]
                                      ] || rows[0]}
                                      <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                </div>
                                <DropdownMenuContent className="w-56 flex flex-col gap-1">
                                  {rows?.map((value, indexItem) => (
                                    <DropdownMenuItem
                                      className={cn(
                                        value ===
                                          selectedValues?.[indexExpense + 1]?.[
                                            headers?.[indexDropdown]
                                          ]
                                          ? "bg-primary"
                                          : "bg-popover",
                                        "text-text-primary"
                                      )}
                                      key={value + indexItem}
                                      onClick={() =>
                                        handleSelectValue(
                                          indexExpense + 1,
                                          headers[indexDropdown],
                                          value
                                        )
                                      }
                                    >
                                      {value}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              {/* {errors[indexExpense + 1] && ( */}
                              {/* )} */}
                            </div>
                            {errors[indexExpense + 1]?.[headers[indexDropdown]] && (
                              <p className="text-red-500">
                                {errors[indexExpense + 1]?.[headers[indexDropdown]]}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
}
