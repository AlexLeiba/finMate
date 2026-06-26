import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import { DropDownCategory } from "./DropDownCategory";
import { generateActiveFilterPayload } from "@/lib/utils/generateActiveFilterPayload";
import { useEffect } from "react";
import { Sort } from "./Sort";

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
  } = formMethods;

  async function onSubmit(data: FilterExpenseFormDataType) {
    const payload = generateActiveFilterPayload(data);

    toast.loading("Loading...", { toastId: "filterExpenses" });
    try {
      await filterAllExpenses(payload);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("filterExpenses");
    }
  }

  useEffect(() => {
    formMethods.setValue("category", filters.category);
    formMethods.setValue("sort", filters.sort);
    formMethods.setValue("searchTerm", filters.searchTerm);
    formMethods.setValue("startDate", filters.startDate);
    formMethods.setValue("endDate", filters.endDate);
    formMethods.setValue("minAmount", filters.minAmount);
    formMethods.setValue("maxAmount", filters.maxAmount);
  }, [
    filters.category,
    filters.sort,
    filters.searchTerm,
    filters.startDate,
    filters.endDate,
    filters.minAmount,
    filters.maxAmount,
    formMethods,
  ]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      autoComplete="off"
      className="flex flex-col gap-4  w-full border p-4 "
    >
      <Controller
        name="searchTerm"
        control={formMethods.control}
        render={({ field: { onChange, value } }) => (
          <InputSearch
            label="Search Expenses"
            disabled={isLoading}
            aria-label="Search expenses by description, category or amount"
            title="Search expenses by description, category or amount"
            placeholder="Search expenses by description, category or amount"
            onChange={(e) => onChange(e.target.value)}
            value={value}
          />
        )}
      />

      <div className="flex items-center  gap-2 ">
        <Controller
          control={formMethods.control}
          name="minAmount"
          render={({ field }) => (
            <Input
              disabled={isLoading}
              label="Min Amount"
              placeholder="9.99"
              type="number"
              error={errors.minAmount?.message}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <Controller
          control={formMethods.control}
          name="maxAmount"
          render={({ field }) => (
            <Input
              disabled={isLoading}
              label="Max Amount"
              placeholder="99.99"
              type="number"
              error={errors.maxAmount?.message}
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </div>

      <Sort />

      <FormProvider {...formMethods}>
        <DropDownCategory disabled={isLoading} name="category" />

        <div className="flex items-center gap-4 lg:flex-row flex-col">
          <DatePicker
            disabled={isLoading}
            label="Start Date"
            name="startDate"
          />
          <DatePicker disabled={isLoading} label="End Date" name="endDate" />
        </div>
      </FormProvider>

      <div className="flex gap-4 w-full">
        <Button
          type="submit"
          title="Apply Filter"
          aria-label="Apply Filter"
          className="w-full"
          loading={isLoading}
          variant={"accent"}
        >
          Apply Filter
        </Button>
      </div>
    </form>
  );
}
