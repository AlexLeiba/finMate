import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { budgetSchema, type BudgetSchemaType } from "@/lib/schemas/forms/budgetsSchema";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { DropDownBudgetType } from "@/components/Budgets/DropDownBudgetType";
import { useNavigate } from "@tanstack/react-router";

export function CreateNewBudgetForm() {
  const { createBudget, isLoading, budgetType } = useBudgetsStore(
    useShallow((state) => ({
      createBudget: state.createBudget,
      isLoading: state.isLoading,
      budgetType: state.budgetType,
    }))
  );
  const navigate = useNavigate();

  const formMethods = useForm<BudgetSchemaType>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      title: "",
      budgetType: budgetType,
      date: new Date(),
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formMethods;
  console.log("🚀 ~ CreateNewBudgetForm ~ errors:", errors);

  async function onSubmit(data: BudgetSchemaType) {
    toast.loading("Loading...", { toastId: "createExpense" });
    try {
      const response = await createBudget(data);
      console.log("🚀 ~ onSubmit ~ response:", response);
      if (response) {
        navigate({
          to: `/budgets/${response._id}`,
        });
      }
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("createExpense");
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex flex-col gap-4  w-full border p-4"
    >
      <Input
        disabled={isLoading}
        label="Title"
        placeholder="Type your title"
        error={errors.title?.message}
        {...register("title")}
      />

      <FormProvider {...formMethods}>
        <DropDownBudgetType disabled={isLoading} name="budgetType" budgetType={budgetType} />
      </FormProvider>

      <Button
        loading={isLoading}
        variant={"accent"}
        className="w-full"
        type="submit"
        disabled={isLoading}
      >
        Create Budget
      </Button>
    </form>
  );
}
