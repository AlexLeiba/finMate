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
        "flex items-stretch border border-border rounded-md cursor-pointer hover:border-accent transition-colors duration-200"
      )}
    >
      <button
        type="button"
        onClick={onNavigate}
        disabled={!onNavigate}
        className="flex-1 px-3 py-2 text-left cursor-pointer disabled:cursor-default"
      >
        <div className="flex justify-between">
          <p
            className={cn(
              "text-sm px-4 py-1 mb-2 rounded-full border",
              budgetType === "savings"
                ? "bg-green-900 border-green-800 text-green-300"
                : budgetType === "expenses"
                  ? "bg-red-900 border-red-800 text-red-300"
                  : "bg-black border-gray-800 text-gray-300"
            )}
          >
            {budgetType}
          </p>
          <p>{formatCurrency(budgetTargetAmount, currency)}</p>
        </div>
        <p>{title}</p>
        <p className="text-sm text-gray-400">{date?.toDateString()}</p>
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
