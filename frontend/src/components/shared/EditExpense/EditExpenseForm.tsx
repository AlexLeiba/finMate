import { DatePicker } from "@/components/shared/DatePicker";
import { DropDownCategory } from "@/components/Expenses/Filters/DropDownCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  expenseFormSchema,
  type ExpenseFormDataType,
} from "@/lib/schemas/forms/expenseSchema";
import { type ExpenseType } from "@/lib/types/expense.types";
import { useExpenseStore } from "@/store/useExpensesStore";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, FormProvider, useForm } from "react-hook-form";

import { toast } from "react-toastify";

export function EditExpenseForm({
  expense,
  onOpenChangeMemo,
}: {
  expense: ExpenseType;
  onOpenChangeMemo: (open: boolean) => void;
}) {
  const updateExpense = useExpenseStore((state) => state.updateExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);
  const formMethods = useForm<ExpenseFormDataType>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date || new Date(),
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formMethods;

  async function onSubmit(data: ExpenseFormDataType) {
    toast.loading("Loading...", { toastId: "updateExpense" });
    try {
      await updateExpense(
        { ...data, amount: Number(data.amount) },
        expense._id,
      );
      toast.success("Expense updated successfully", {
        toastId: "updateExpenseSuccess",
      });
      onOpenChangeMemo(false);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("updateExpense");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      autoComplete="off"
      className="flex flex-col gap-4  w-full border p-4"
    >
      <Textarea
        disabled={isLoading}
        label="Description"
        placeholder="Coffee at Starbucks"
        error={errors.description?.message}
        {...register("description")}
      />

      <Controller
        control={formMethods.control}
        name="amount"
        render={({ field }) => (
          <Input
            disabled={isLoading}
            label="Amount"
            placeholder="99.99"
            type="number"
            error={errors.amount?.message}
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />

      <FormProvider {...formMethods}>
        <DropDownCategory disabled={isLoading} name="category" />

        <DatePicker disabled={isLoading} name="date" label="Date" />
      </FormProvider>

      <div className="flex gap-4">
        <Button loading={isLoading} disabled={isLoading} variant={"accent"}>
          Update Expense
        </Button>
      </div>
    </form>
  );
}
