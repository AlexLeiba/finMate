import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { Route } from "@/routes/(app)/_protected/budgets/$budgetId";
import { useAuthStore } from "@/store/useAuthStore";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";

import {
  BudgetType,
  budgetOptionsSchema,
  budgetSchema,
  type BudgetOptionsSchemaType,
  type BudgetSchemaType,
} from "@/lib/schemas/forms/budgetsSchema";

import { Edit, Plus, X } from "lucide-react";
import { DatePicker } from "@/components/shared/DatePicker";
import { BREAKPOINTS } from "@/lib/consts/breakpoints";
import { useResponsive } from "@/lib/hooks/useResponsive";

function SingleBudgetPage() {
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);
  const [dialogOptionIndex, setDialogOptionIndex] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const isMobile = useResponsive(BREAKPOINTS.md);
  const params = Route.useParams();

  const { getSingleBudget, singleBudget, budgetType, updateBudget, isLoading } = useBudgetsStore(
    useShallow((state) => {
      return {
        budgetType: state.singleBudget?.budgetType || BudgetType.SAVINGS,
        getSingleBudget: state.getSingleBudget,
        singleBudget: state.singleBudget,
        isLoading: state.isLoading,
        updateBudget: state.updateBudget,
      };
    })
  );

  const currency = useAuthStore((state) => state.user?.currency) || DEFAULT_CURRENCY;
  const formMethods = useForm<BudgetSchemaType>({
    resolver: zodResolver(budgetSchema),
    mode: "onSubmit",
    defaultValues: {
      title: singleBudget?.title || "",
      description: singleBudget?.description || "",
      budgetType: singleBudget?.budgetType || BudgetType.SAVINGS,
      date: singleBudget?.date || new Date(),
    },
  });

  const formMethodsOptions = useForm<BudgetOptionsSchemaType>({
    resolver: zodResolver(budgetOptionsSchema),
    mode: "onChange",
    defaultValues: {
      options: singleBudget?.options || [],
    },
  });

  const {
    watch: watchOptions,
    trigger: triggerOptions,
    getValues: getOptionValues,
    reset: resetOptions,
    formState: { errors: errorsOptions },
    register: registerOptions,
  } = formMethodsOptions;

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = formMethods;

  useEffect(() => {
    setValue("budgetTargetAmount", undefined);
    toast.loading("Loading...", { toastId: "fetchExpenses" });

    async function fetchBudget() {
      try {
        const response = await getSingleBudget(params?.budgetId);

        setValue("title", response?.title || "");
        setValue("description", response?.description);
        setValue("budgetType", response?.budgetType || BudgetType.SAVINGS);
        setValue("date", response?.date);
        setValue("budgetTargetAmount", response?.budgetTargetAmount || undefined);
        resetOptions({ options: response?.options || [] });
      } catch (error: unknown) {
        toast.error(error as string);
      } finally {
        toast.dismiss("fetchExpenses");
      }
    }
    fetchBudget();
  }, [getSingleBudget, params.budgetId, resetOptions, setValue]);

  console.log("🚀 ~ SingleBudgetPage ~ errors>>>>>>>>>:", errors);

  const options = watchOptions("options");
  const budgetTargetAmount = watch("budgetTargetAmount");

  const totalAddedOptions = useMemo(
    () => options?.reduce((total, option) => total + Number(option?.amount || 0), 0) || 0,
    [options]
  );
  const budgetRemaining = Math.max((budgetTargetAmount || 0) - totalAddedOptions, 0);
  const targetPeriods = budgetRemaining / (totalAddedOptions || 1);
  const yearsToOneDecimal = (value: number) => Math.round(value * 10) / 10;

  const { fields, append, remove, replace } = useFieldArray({
    control: formMethodsOptions.control,
    name: "options",
  });

  // on SAVE
  async function onSubmit(data: BudgetSchemaType) {
    const currentOptions = getOptionValues("options") || [];
    const completeOptions = currentOptions.filter(
      (option): option is { title: string; amount: number } =>
        Boolean(option.title.trim()) &&
        typeof option.amount === "number" &&
        Number.isFinite(option.amount) &&
        option.amount > 0
    );

    if (completeOptions.length !== currentOptions.length) {
      replace(completeOptions);
      setIsOptionsDialogOpen(false);
      setDialogOptionIndex(null);
    }

    const optionsAreValid = await triggerOptions("options");
    if (!optionsAreValid) return;

    toast.loading("Loading...", { toastId: "createExpense" });
    try {
      await updateBudget(
        {
          ...data,
          budgetType: singleBudget?.budgetType ?? data.budgetType ?? BudgetType.SAVINGS,
          options: completeOptions,
        },
        params.budgetId
      );

      setIsEdit(false);
      setIsOptionsDialogOpen(false);
      setDialogOptionIndex(null);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("createExpense");
    }
  }

  function handleOpenOptionsDialog() {
    const currentOptions = getOptionValues("options") || [];
    const incompleteOptionIndex = currentOptions.findIndex(
      (option) => !option.title.trim() || !Number.isFinite(option.amount) || option.amount === 0
    );

    if (incompleteOptionIndex >= 0) {
      setDialogOptionIndex(incompleteOptionIndex);
    } else {
      setDialogOptionIndex(currentOptions.length);
      append({ title: "", amount: undefined });
    }
    setIsOptionsDialogOpen(true);
  }

  const budgetOptionLabel = singleBudget?.budgetType === BudgetType.EXPENSES ? "expense" : "saving";
  const optionEditor = dialogOptionIndex !== null && fields[dialogOptionIndex] && (
    <div key={fields[dialogOptionIndex].id} className="flex flex-col gap-3 rounded-md border p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium">New {budgetOptionLabel}</p>
        <button
          type="button"
          aria-label={`Discard new ${budgetOptionLabel}`}
          className="flex size-9 shrink-0 items-center justify-center rounded-md hover:bg-secondary"
          onClick={() => {
            remove(dialogOptionIndex);
            setDialogOptionIndex(null);
            setIsOptionsDialogOpen(false);
          }}
        >
          <X aria-hidden="true" />
        </button>
      </div>
      <Input
        disabled={isLoading}
        label="Title"
        placeholder="Type a title"
        error={errorsOptions?.options?.[dialogOptionIndex]?.title?.message ?? ""}
        {...registerOptions(`options.${dialogOptionIndex}.title`)}
      />
      <Controller
        control={formMethodsOptions.control}
        name={`options.${dialogOptionIndex}.amount`}
        render={({ field }) => (
          <Input
            label="Amount"
            disabled={isLoading}
            placeholder="99.99"
            type="number"
            error={errorsOptions?.options?.[dialogOptionIndex]?.amount?.message ?? ""}
            {...field}
            value={field.value ?? ""}
            onChange={(e) =>
              field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
            }
          />
        )}
      />
    </div>
  );

  const statsBudgetType = singleBudget?.budgetType === "expenses" ? "spend" : "set aside";

  return (
    <div className="flex flex-col gap-2 relative h-full">
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {/* EDIT */}
        {isEdit ? (
          <div className="flex flex-col gap-2 border rounded-md p-4 relative">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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

              <FormProvider {...formMethods}>
                <DatePicker disabled={isLoading} name="date" label="Date" />
              </FormProvider>
              <Button variant="accent" className="w-full">
                Save changes
              </Button>
            </form>
            <button
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setIsEdit(false)}
            >
              <X />
            </button>
          </div>
        ) : (
          <div className="flex min-w-0 gap-2 border rounded-md p-4 relative">
            <div className="min-w-0 pr-8">
              <h3 className="line-clamp-1">{singleBudget?.title}</h3>
              <p className="wrap-break-word">{singleBudget?.description}</p>
              <p>Budget type: {singleBudget?.budgetType}</p>
            </div>

            <button
              onClick={() => setIsEdit(true)}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <Edit />
            </button>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            variant={"accent"}
            className="w-full sm:w-50"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-1 items-center">
          <p className="text-xl">Budget Target ({currency})</p>
          <Controller
            control={formMethods.control}
            name="budgetTargetAmount"
            render={({ field }) => (
              <Input
                disabled={isLoading}
                placeholder="99.99"
                type="number"
                error={errors.budgetTargetAmount?.message}
                {...field}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                }
              />
            )}
          />
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <div className="order-2 flex min-w-0 w-full flex-col gap-4 lg:order-1">
          <div className="flex flex-col gap-3">
            <h4 className="text-center">Your added {singleBudget?.budgetType}</h4>
            {fields.map((field, index) => (
              <div key={field.id} className="flex min-w-0 flex-col gap-2 border rounded-md p-4">
                <div className="flex items-center justify-between gap-1">
                  <p>
                    {singleBudget?.budgetType?.toUpperCase()} {index + 1}
                  </p>
                  <button
                    type="button"
                    aria-label={`Delete ${singleBudget?.budgetType} option ${index + 1}`}
                    className="cursor-pointer w-8 h-8 rounded-full"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </button>
                </div>
                <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
                  <Input disabled label="Title" value={options?.[index]?.title || ""} />
                  <Input
                    disabled
                    label="Amount"
                    type="number"
                    value={options?.[index]?.amount ?? ""}
                  />
                </div>
              </div>
            ))}
            {fields.length === 0 && <p>No options added yet</p>}
            <Button className="w-full" onClick={handleOpenOptionsDialog}>
              <div className="flex items-center gap-1 justify-center">
                Add {budgetOptionLabel} <Plus />
              </div>
            </Button>
            {!isMobile && isOptionsDialogOpen && (
              <div className="flex flex-col gap-4 rounded-md border p-4">
                <h4>Add {budgetOptionLabel}</h4>
                {optionEditor}
                <Button
                  type="button"
                  variant="accent"
                  className="w-full"
                  loading={isLoading}
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="order-1 min-w-0 w-full rounded-md border p-4 flex flex-col gap-2 lg:sticky lg:top-16 lg:order-2">
          <h4 className="text-center">Your {singleBudget?.budgetType} Stats</h4>

          <p>
            Budget target: <b>{budgetTargetAmount}</b>
          </p>
          <p>
            Total {budgetType}: <b>{totalAddedOptions}</b>
          </p>
          <p>
            {budgetType === "expenses" ? "Budget left" : "Savings left to add"}:{" "}
            <b>{budgetRemaining}</b>
          </p>
          {!budgetTargetAmount ? (
            <p>Set a budget target to see estimates.</p>
          ) : totalAddedOptions <= 0 ? (
            <p>Add an option amount to see estimates.</p>
          ) : budgetRemaining <= 0 ? (
            <p>Budget target reached.</p>
          ) : (
            <ul className="list-disc list-inside ml-4">
              <p>Estimated time to reach your budget:</p>

              <p>
                {" "}
                <b>If Daily {statsBudgetType}:</b>
              </p>
              <li>Days: {Math.ceil(targetPeriods)}</li>
              <li>Weeks: {Math.ceil(targetPeriods / 7)}</li>
              <li>Months: {Math.ceil(targetPeriods / 30)}</li>
              <li>Years: {yearsToOneDecimal(targetPeriods / 365)}</li>

              <p className="mt-4">
                <b>If Weekly {statsBudgetType}:</b>
              </p>

              <li>Weeks: {Math.ceil(targetPeriods)}</li>
              <li>Months: {Math.round((targetPeriods * 7) / 30)}</li>
              <li>Years: {yearsToOneDecimal((targetPeriods * 7) / 365)}</li>

              <p className="mt-4">
                <b>If Monthly {statsBudgetType}:</b>
              </p>

              <li>Months: {Math.ceil(targetPeriods)}</li>
              <li>Years: {yearsToOneDecimal(targetPeriods / 12)}</li>
            </ul>
          )}
        </div>
      </div>

      <Dialog
        open={isMobile && isOptionsDialogOpen}
        onOpenChange={(open) => setIsOptionsDialogOpen(open)}
      >
        <DialogContent className="w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add {budgetOptionLabel}</DialogTitle>
            <DialogDescription>
              Add a title and amount for this {budgetOptionLabel}. Saving updates this budget.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {optionEditor}
            <Button
              type="button"
              variant="accent"
              className="w-full"
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SingleBudgetPage;
