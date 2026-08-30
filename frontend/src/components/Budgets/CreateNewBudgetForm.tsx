import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, FormProvider, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { createBudgetSchema, type CreateBudgetSchemaType } from "@/lib/schemas/forms/budgetsSchema";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { DropDownBudgetType } from "@/components/Budgets/DropDownBudgetType";
import { useNavigate } from "@tanstack/react-router";

export function CreateNewBudgetForm() {
  const { createBudget, isLoading } = useBudgetsStore(
    useShallow((state) => ({ createBudget: state.createBudget, isLoading: state.isLoading }))
  );
  const navigate = useNavigate();

  const formMethods = useForm<CreateBudgetSchemaType>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      title: "",
      description: "",
      budgetType: "savings",
      budgetTargetAmount: 0,
      date: new Date(),
      options: [],
      periodStats: "daily",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = formMethods;

  async function onSubmit(data: CreateBudgetSchemaType) {
    console.log("🚀 ~ onSubmit ~ data:", data);
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
      action=""
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
      <Textarea
        disabled={isLoading}
        label="Description"
        placeholder="Coffee at Starbucks"
        error={errors.description?.message}
        {...register("description")}
      />

      <Controller
        control={formMethods.control}
        name="budgetTargetAmount"
        render={({ field }) => (
          <Input
            disabled={isLoading}
            label="Budget Target"
            placeholder="99.99"
            type="number"
            error={errors.budgetTargetAmount?.message}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />

      <FormProvider {...formMethods}>
        <DropDownBudgetType disabled={isLoading} name="budgetType" />

        <DatePicker disabled={isLoading} name="date" label="Date" />
      </FormProvider>

      <div className="flex gap-4">
        <Button loading={isLoading} variant={"accent"}>
          Create Budget
        </Button>
      </div>
    </form>
  );
}
