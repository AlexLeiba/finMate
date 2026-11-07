import type { BudgetType } from "@/lib/schemas/apis/budgetsSchema";
import { cn } from "@/lib/utils/tailwindUtils";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ModalDelete } from "@/components/shared/ModalDelete";
import { useState } from "react";
import { toast } from "react-toastify";
import { formatCurrency } from "@/lib/utils/formatCurrency";

type BudgetCardProps = {
  budgetType: BudgetType | undefined;
  budgetTargetAmount: number | undefined;
  title: string;
  date: Date | undefined;
  currency: string;
  onNavigate?: () => void;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
};
export function BudgetCard({
  budgetType,
  budgetTargetAmount,
  title,
  date,
  currency,
  onNavigate,
  onDelete,
  isLoading = false,
}: BudgetCardProps) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    if (!onDelete) return;

    toast.loading("Loading...", { toastId: "deleteBudget" });
    try {
      await onDelete();
      toast.success(`${title} budget deleted successfully`, {
        toastId: "deleteBudgetSuccess",
      });
      setOpen(false);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("deleteBudget");
    }
  }

  return (
    <div
      className={cn(
        "flex min-w-0 w-full items-stretch rounded-md border border-border transition-colors duration-200 hover:border-accent"
      )}
    >
      <button
        type="button"
        onClick={onNavigate}
        disabled={!onNavigate}
        className="min-w-0 flex-1 cursor-pointer px-3 py-2 text-left disabled:cursor-default"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p
            className={cn(
              "mb-2 rounded-full border px-3 py-1 text-sm",
              budgetType === "savings"
                ? "bg-green-900 border-green-800 text-green-300"
                : budgetType === "expenses"
                  ? "bg-red-900 border-red-800 text-red-300"
                  : "bg-black border-gray-800 text-gray-300"
            )}
          >
            {budgetType}
          </p>
          <p className="shrink-0 text-right">{formatCurrency(budgetTargetAmount, currency)}</p>
        </div>
        <p className="wrap-break-word">{title}</p>
        <p className="text-sm text-text-secondary">{date?.toDateString()}</p>
      </button>
      {onDelete && (
        <ModalDelete
          open={open}
          onOpenChange={setOpen}
          onSubmit={handleDelete}
          title={`Delete ${title} budget`}
        >
          <Button
            loading={isLoading}
            aria-label={`delete ${title} budget`}
            title={`delete ${title} budget`}
            size="sm"
            variant="destructive"
            className="opacity-30 hover:opacity-100"
          >
            <Trash />
          </Button>
        </ModalDelete>
      )}
    </div>
  );
}
