import {
  expenseFormSchema,
  type ExpenseFormDataType,
} from "@/lib/schemas/forms/expenseSchema";
import { ExpenseCategory } from "@/lib/types/expense.types";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useExpenseStore } from "@/store/useExpensesStore";
import { DropDownCategory } from "./DropDownCategory";
import { DatePicker } from "../shared/DatePicker";
import { toast } from "react-toastify";

export function CreateNewExpenseForm() {
  const createExpense = useExpenseStore((state) => state.createExpense);
  const isLoading = useExpenseStore((state) => state.isLoading);
  const formMethods = useForm<ExpenseFormDataType>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      amount: 0,
      category: ExpenseCategory.ALL,
      description: "",
      date: new Date(),
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formMethods;

  async function onSubmit(data: ExpenseFormDataType) {
    console.log(data);
    toast.loading("Loading...", { toastId: "createExpense" });
    try {
      await createExpense({ ...data, amount: Number(data.amount) });
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("createExpense");
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
      <Input
        disabled={isLoading}
        label="Amount"
        placeholder="99.99"
        type="number"
        error={errors.amount?.message}
        {...register("amount")}
        min={0}
      />

      <FormProvider {...formMethods}>
        <DropDownCategory isLoading={isLoading} />

        <DatePicker name="date" label="Date" />
      </FormProvider>

      <div className="flex gap-4">
        <Button loading={isLoading} variant={"accent"}>
          Create Expense
        </Button>
      </div>
    </form>
  );
}
