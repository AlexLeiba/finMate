import { useExpenseStore } from "@/store/useExpensesStore";
import { toast } from "react-toastify";
import { filterExpenseSchema } from "@/lib/schemas/forms/filterExpenseSchema";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { InputSearch } from "./inputSearch";
import { generateActiveFilterPayload } from "@/lib/utils/generateActiveFilterPayload";
import { useEffect, useState } from "react";

export function SearchExpense() {
  const [search, setSearch] = useState("");
  // const filterAllExpenses = useExpenseStore((state) => state.getAllExpenses);
  const setFilters = useExpenseStore((state) => state.setFilters);
  const filters = useExpenseStore((state) => state.filters);

  useEffect(() => {
    setSearch(filters.searchTerm || "");
  }, [filters.searchTerm]);

  async function handleSubmit(searchTerm: string) {
    const parsed = filterExpenseSchema.safeParse({
      searchTerm,
    });

    if (!parsed.success) {
      return toast.error(parsed.error.message);
    }

    const payload = generateActiveFilterPayload({
      ...filters,
      searchTerm: parsed.data.searchTerm,
    });

    setFilters(payload);
  }
  const debounceSearch = useDebounce(handleSubmit, 1000);

  function handleSearch(searchTerm: string) {
    setSearch(searchTerm);
    debounceSearch(searchTerm);
  }

  function handleClear() {
    const payload = generateActiveFilterPayload({
      ...filters,
      searchTerm: undefined,
    });
    setFilters(payload);
    setSearch("");
  }
  return (
    <InputSearch
      onClear={() => handleClear()}
      onChange={(e) => handleSearch(e.target.value)}
      value={search}
      aria-label="Search expenses by description, category or amount"
      title="Search expenses by description, category or amount"
      placeholder="Search for expenses"
    />
  );
}
