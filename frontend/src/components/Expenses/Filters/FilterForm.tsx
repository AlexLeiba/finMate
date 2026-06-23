import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useExpenseStore } from "@/store/useExpensesStore";
import { DatePicker } from "../../shared/DatePicker";
import { toast } from "react-toastify";
import {
  filterExpenseSchema,
  type FilterExpenseFormDataType,
} from "@/lib/schemas/forms/filterExpenseSchema";
import { InputSearch } from "../../ui/inputSearch";
import { DropDown } from "../../shared/DropDown";

export function FilterForm() {
  const filterAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const filters = useExpenseStore((state) => state.filters);
  const isLoading = useExpenseStore((state) => state.isLoading);
  const formMethods = useForm<FilterExpenseFormDataType>({
    resolver: zodResolver(filterExpenseSchema),
    defaultValues: {
      category: filters.category,
      sort: filters.sort,
      searchTerm: filters.searchTerm,
      startDate: filters.startDate,
      endDate: filters.endDate,
      minAmount: filters.minAmount,
      maxAmount: filters.maxAmount,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formMethods;

  async function onSubmit(data: FilterExpenseFormDataType) {
    console.log(data);
    toast.loading("Loading...", { toastId: "filterExpenses" });
    try {
      await filterAllExpenses(data);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("filterExpenses");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      autoComplete="off"
      className="flex flex-col gap-4  w-full border p-4 "
    >
      <InputSearch
        label="Search Expenses"
        disabled={isLoading}
        aria-label="Search expenses by description, category or amount"
        title="Search expenses by description, category or amount"
        placeholder="Search expenses by description, category or amount"
        {...register("searchTerm")}
      />

      <div className="flex items-center  gap-2 ">
        <Input
          disabled={isLoading}
          label="Min Amount"
          placeholder="99.99"
          type="number"
          error={errors.minAmount?.message}
          {...register("minAmount")}
          min={0}
        />
        <Input
          disabled={isLoading}
          label="Max Amount"
          placeholder="99.99"
          type="number"
          error={errors.maxAmount?.message}
          {...register("maxAmount")}
          min={0}
        />
      </div>

      <FormProvider {...formMethods}>
        <DropDown disabled={isLoading} name="category" />

        <div className="flex items-center gap-4 lg:flex-row flex-col">
          <DatePicker label="Start Date" name="startDate" />
          <DatePicker label="End Date" name="endDate" />
        </div>
      </FormProvider>

      <div className="flex gap-4 w-full">
        <Button className="w-full" loading={isLoading} variant={"accent"}>
          Apply Filter
        </Button>
      </div>
    </form>
  );
}
