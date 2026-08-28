import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Suspense, useEffect, useRef, useState, type ChangeEvent } from "react";
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
import { apiFactory } from "@/api/services/apiFactory";

import * as z from "zod";
import { ExpenseCategory } from "@/lib/types/expense.types";
import { CATEGORIES } from "@/lib/consts/categories";
import { uploadNewExpensesFormSchema } from "@/lib/schemas/forms/expenseSchema";

const uploadNewExpensesSchemaOptional = z
  .object({
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    category: z.string().optional(),
    amount: z.coerce.number().optional(),
  })
  .refine(
    (state) => {
      if (state.date) {
        const date = new Date(state.date);
        return date.toString() !== "Invalid Date";
      }
      return true;
    },
    { message: "Invalid date" }
  );

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

      csvRows.forEach((row, index) => {
        setErrors((prev) => ({ ...prev, [index + 1]: [row] }));
      });
    };
  }

  const [selectedValues, setSelectedValues] = useState<Record<string, { [key: string]: any }>>({});
  const [errors, setErrors] = useState<Record<string, { [key: string]: any }>>({});
  console.log("🚀 ~ GenerateExpensesModal ~ errors:", errors);
  console.log("🚀 ~ handleSelectValue ~ selectedValues:", selectedValues);

  function handleSelectValue(cardId: number, key: string, value: any) {
    // validate vlues before saving;

    const validatedValues = uploadNewExpensesSchemaOptional.safeParse({ [key]: value });
    console.log("🚀 ~ handleSelectValue ~ validatedValues:>>>>>>>>", validatedValues);

    if (!validatedValues.success) {
      const errorMessage = JSON.parse(validatedValues.error.message)?.[0]?.message;
      setErrors((prev) => ({ ...prev, [cardId]: { ...prev[cardId], [key]: errorMessage } }));
    }
    setSelectedValues((prev) => ({ ...prev, [cardId]: { ...prev[cardId], [key]: value } }));

    if (validatedValues.success) {
      setErrors((prev) => ({ ...prev, [cardId]: { ...prev[cardId], [key]: "" } }));
    }
  }

  function handleSetDefaultDate(cardId: number, key: string) {
    const value = new Date();
    setErrors((prev) => ({ ...prev, [cardId]: { ...prev[cardId], [key]: "" } }));
    setSelectedValues((prev) => ({
      ...prev,
      [cardId]: { ...prev[cardId], date: value.toISOString() },
    }));
  }
  const EXCLUDED_KEYS = ["createdAt", "updatedAt", "userId", "_id"];

  async function handleSubmit() {
    const parsedExpenses = Object.values(selectedValues);
    console.log("🚀 ~ handleSubmit ~ parsedExpenses:", parsedExpenses);

    const validatedResult = uploadNewExpensesFormSchema.safeParse(parsedExpenses);
    console.log("🚀 ~ handleSubmit ~ validatedResult:>>>>>>>>", validatedResult);

    if (!validatedResult.success) {
      const errorMessage = JSON.parse(validatedResult.error.message)?.[0]?.message;
      toast.error(errorMessage);
      return;
    }
    try {
      const response = await apiFactory().createMultipleExpenses(validatedResult.data);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      toast.success("Expenses created successfully");
    } catch (error: unknown) {
      toast.error(error as string);
    }
    // whould collect an array of each obj, on submit I would validate all of them again before saving it.
    // validate also on select
    // take a list of expenses
    // on backend map through and create expenses
  }

  useEffect(() => {
    return () => {
      setHeaders([]);
      setExpenses([]);
      setSelectedValues({});
      setErrors({});
    };
  }, []);
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
          <div className="flex justify-between">
            <h4 className="text-lg font-semibold">Upload new expenses</h4>
            <Button variant="secondary" onClick={handleSubmit} className="mr-8">
              Save expenses
            </Button>
          </div>
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
                        const errorMessage = errors[indexExpense + 1]?.[headers[indexDropdown]];
                        const selectedValue =
                          selectedValues?.[indexExpense + 1]?.[headers?.[indexDropdown]];
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
                                      variant={
                                        selectedValue && !errorMessage ? "secondary" : "outline"
                                      }
                                      className="w-full justify-between"
                                      classNameChildren="flex items-center justify-between"
                                    >
                                      {selectedValue || "Select a value"}
                                      <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                </div>
                                <DropdownMenuContent className="w-56 flex flex-col gap-1">
                                  {headers[indexDropdown] === "category"
                                    ? Object.values(ExpenseCategory).map((category) => (
                                        <DropdownMenuItem
                                          className={cn(
                                            value === category && "bg-primary text-text-primary"
                                          )}
                                          key={category}
                                          onClick={() => {
                                            handleSelectValue(
                                              indexExpense + 1,
                                              headers[indexDropdown],
                                              category
                                            );
                                          }}
                                        >
                                          {CATEGORIES[category as ExpenseCategory]}
                                        </DropdownMenuItem>
                                      ))
                                    : rows?.map((value, indexItem) => (
                                        <DropdownMenuItem
                                          className={cn(
                                            value === selectedValue ? "bg-primary" : "bg-popover",
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

                              {headers[indexDropdown] === "date" && (
                                <Button
                                  variant="primary"
                                  onClick={() => handleSetDefaultDate(indexExpense + 1, "date")}
                                >
                                  Today
                                </Button>
                              )}

                              {/* {errors[indexExpense + 1] && ( */}
                              {/* )} */}
                            </div>
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
