import { useExpenseStore } from "@/store/useExpensesStore";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export function TotalStats({ currency }: { currency: string }) {
  const stats = useExpenseStore((state) => state.stats);
  return (
    <section className="border px-4 py-2 flex flex-col gap-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-text-secondary">Total expenses</p>
          <p className="text-xl font-bold">{stats.totalCount} Expenses</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-text-secondary">Total Amount</p>

          <p className="text-xl font-bold">{formatCurrency(stats.totalAmount, currency)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-text-secondary">Average Amount</p>
          <p className="text-xl font-bold">{formatCurrency(stats.averageAmount, currency)}</p>
        </div>
      </div>
    </section>
  );
}
