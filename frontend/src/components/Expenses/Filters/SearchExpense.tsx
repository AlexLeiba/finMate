import { useState } from "react";

import { useExpenseStore } from "@/store/useExpensesStore";
import { toast } from "react-toastify";
import { filterExpenseSchema } from "@/lib/schemas/forms/filterExpenseSchema";
import { InputSearch } from "../../ui/inputSearch";
import { useDebounce } from "@/lib/hooks/useDebounce";

export function SearchExpense() {
  const filterAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  // const isLoading = useExpenseStore((state) => {
  //   return state.isLoading;
  // });

  const [search, setSearch] = useState("");

  async function handleSubmit(searchTerm: string) {
    const parsed = filterExpenseSchema.safeParse({
      searchTerm,
    });

    if (!parsed.success) {
      return toast.error(parsed.error.message);
    }

    toast.loading("Loading...", { toastId: "search" });
    try {
      await filterAllExpenses({ searchTerm: parsed.data.searchTerm });
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("search");
    }
  }
  const debounceSearch = useDebounce(handleSubmit, 1000);

  function handleSearch(searchTerm: string) {
    setSearch(searchTerm);
    debounceSearch(searchTerm);
  }
  return (
    <InputSearch
      onChange={(e) => handleSearch(e.target.value)}
      value={search}
      placeholder="Search expenses"
      aria-label="Search expenses"
      title="Search expenses"
    />
  );
}
