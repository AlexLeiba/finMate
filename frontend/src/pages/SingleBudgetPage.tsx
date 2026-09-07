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
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";

import {
  BudgetType,
  budgetOptionsSchema,
  budgetSchema,
  type BudgetOptionsSchemaType,
  type BudgetSchemaType,
} from "@/lib/schemas/forms/budgetsSchema";

import { DropDownBudgetType } from "@/components/Budgets/DropDownBudgetType";

import { Edit, Plus, X } from "lucide-react";
import { DatePicker } from "@/components/shared/DatePicker";

function SingleBudgetPage() {
  const [addOption, setAddOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const params = Route.useParams();

  const { getSingleBudget, singleBudget, budgetType, updateBudget, isLoading } = useBudgetsStore(
    useShallow((state) => {
      return {
        budgetType: state.budgetType,
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
      budgetTargetAmount: singleBudget?.budgetTargetAmount,
      date: singleBudget?.date || new Date(),
    },
  });
  const formMethodsOptions = useForm<BudgetOptionsSchemaType>({
    resolver: zodResolver(budgetOptionsSchema),
    mode: "onChange",
    defaultValues: {
      options: singleBudget?.options || [{ title: "", amount: 0 }],
    },
  });

  const {
    watch: watchOptions,
    handleSubmit: handleSubmitOptions,
    trigger: triggerOptions,
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
    toast.loading("Loading...", { toastId: "fetchExpenses" });

    async function fetchBudget() {
      try {
        const response = await getSingleBudget(params?.budgetId);

        setValue("title", response?.title || "");
        setValue("description", response?.description);
        setValue("date", response?.date);
        setValue("budgetTargetAmount", response?.budgetTargetAmount);
      } catch (error: unknown) {
        toast.error(error as string);
      } finally {
        toast.dismiss("fetchExpenses");
      }
    }
    fetchBudget();
  }, [budgetType]);

  console.log("🚀 ~ SingleBudgetPage ~ errors>>>>>>>>>:", errors);

  const options = watchOptions("options");
  const budgetTargetAmount = watch("budgetTargetAmount");

  const totalAddedOptions = useMemo(() => {
    if (budgetType === "savings") {
      return options?.reduce((acc, option) => {
        return acc + Number(option?.amount) || 0;
      }, 0);
    }

    if (budgetType === "expenses") {
      return options?.reduce((acc, option) => {
        return acc - Number(option?.amount);
      }, budgetTargetAmount || 0);
    }

    return 0;
  }, [options, budgetType]);

  const { fields, append, remove } = useFieldArray({
    control: formMethodsOptions.control,
    name: "options",
  });

  // on SAVE
  async function onSubmit(data: BudgetSchemaType) {
    console.log("🚀 ~ onSubmit ~ data:", data);
    toast.loading("Loading...", { toastId: "createExpense" });
    try {
      await updateBudget(data, params.budgetId);

      setIsEdit(false);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("createExpense");
    }
  }

  async function handleAppendOption() {
    const isValid = await triggerOptions("options");
    if (isValid) {
      append({ title: "", amount: 0 });
    }
  }

  function onSubmitOptions(data: BudgetOptionsSchemaType) {
    console.log("🚀 ~ onSubmitOptions ~ data:", data);
    toast.loading("Loading...", { toastId: "createExpense" });
    try {
      // await updateBudgetOptions(data, params.budgetId);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("createExpense");
    }
  }

  return (
    <div className="flex flex-col gap-2 relative h-full">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
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
                <DropDownBudgetType
                  disabled={isLoading}
                  name="budgetType"
                  budgetType={budgetType}
                />

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
          <div className="flex gap-2 border rounded-md p-4 relative">
            <div>
              <h3 className="line-clamp-1">{singleBudget?.title}</h3>
              <p>{singleBudget?.description}</p>
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
            onClick={() => {
              handleSubmit(onSubmit);
              handleSubmitOptions(onSubmitOptions);
            }}
            loading={isLoading}
            variant={"accent"}
            className="w-50"
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
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className=" flex flex-col gap-4 w-1/2 h-full">
          {!addOption && (
            <Button className="w-full" onClick={() => setAddOption(true)}>
              <div className="flex items-center gap-1 justify-center">
                Add {singleBudget?.budgetType} <Plus />
              </div>
            </Button>
          )}

          {addOption && (
            <div className="flex flex-col gap-2 border rounded-md p-2">
              <h4 className="text-center">Your added {singleBudget?.budgetType}</h4>

              {/* FIRST OPTION */}
              {fields?.length === 0 ? (
                <div className="flex flex-col gap-2 border rounded-md p-4">
                  <div className="flex items-center justify-between gap-1 ">
                    <p>{singleBudget?.budgetType?.toUpperCase()} 1</p>
                    <button
                      className="cursor-pointer w-8 h-8 rounded-full"
                      onClick={() => setAddOption(false)}
                    >
                      <X />
                    </button>
                  </div>
                  <div className="flex items-end gap-2">
                    <Input
                      label="Title"
                      disabled={isLoading}
                      placeholder="Type your title"
                      error={errorsOptions?.options?.[0]?.title?.message ?? ""}
                      {...registerOptions(`options.${0}.title`)}
                    />

                    <Controller
                      control={formMethodsOptions.control}
                      name={`options.${0}.amount`}
                      render={({ field }) => (
                        <Input
                          label="Amount"
                          disabled={isLoading}
                          placeholder="99.99"
                          type="number"
                          error={errorsOptions?.options?.[0]?.amount?.message ?? ""}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />

                    <Button onClick={handleAppendOption}>
                      <div className="flex items-center gap-1 justify-center">
                        <Plus />
                      </div>
                    </Button>
                  </div>
                </div>
              ) : (
                // MORE OPTIONS
                fields?.map((field, index) => {
                  return (
                    <div key={field.id} className="flex flex-col gap-2 border rounded-md p-4">
                      <div className="flex items-center justify-between gap-1 ">
                        <p>
                          {singleBudget?.budgetType?.toUpperCase()} {index + 1}
                        </p>

                        <button
                          className="cursor-pointer w-8 h-8 rounded-full"
                          onClick={() => remove(index)}
                        >
                          <X />
                        </button>
                      </div>

                      <div className="flex items-end gap-2">
                        <Input
                          disabled={isLoading}
                          label="Title"
                          placeholder="Type your title"
                          error={errorsOptions?.options?.[index]?.title?.message ?? ""}
                          {...registerOptions(`options.${index}.title`)}
                        />

                        <Controller
                          control={formMethodsOptions.control}
                          name={`options.${index}.amount`}
                          render={({ field }) => (
                            <Input
                              label="Amount"
                              disabled={isLoading}
                              placeholder="99.99"
                              type="number"
                              error={errorsOptions?.options?.[index]?.amount?.message ?? ""}
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          )}
                        />

                        {/* ADD MORE OPTION BUTTON */}
                        {fields?.length - 1 === index && (
                          <Button onClick={handleAppendOption}>
                            <div className="flex items-center gap-1 justify-center">
                              <Plus />
                            </div>
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
          {/* STATS */}
        </div>
        <div className="p-2 border rounded-md flex flex-col gap-2 sticky top-16 w-1/2">
          <h4 className="text-center">Your {singleBudget?.budgetType} Stats</h4>

          <p>Budget target: {budgetTargetAmount}</p>
          <p>
            Total {budgetType}: {totalAddedOptions || 0}
          </p>
          <p>
            {budgetType.charAt(0).toUpperCase() + budgetType.slice(1)} left to add:
            {(budgetTargetAmount || 0) - (totalAddedOptions || 0)}
          </p>
          {(totalAddedOptions || 0) > 0 && (
            <ul className="list-disc list-inside ml-4">
              <p>Days to reach your target:</p>

              <p>If Daily:</p>
              <li>Days: {Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0))}</li>
              <li>
                Weeks:
                {Math.round(Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0)) / 7)}
              </li>
              <li>
                Months:
                {Math.round(Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0)) / 30)}
              </li>
              <li>
                Years:
                {Math.round(Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0)) / 365)}
              </li>

              <p className="mt-4">If Weekly:</p>

              <li>Weeks:{Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0))}</li>
              <li>
                Months:
                {Math.round(Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0)) / 30)}
              </li>
              <li>
                Years:
                {Math.round(Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0)) / 365)}
              </li>

              <p className="mt-4">If Monthly:</p>

              <li>
                Months:
                {Math.round(Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0)))}
              </li>
              <li>
                Years:
                {Math.round(Math.floor((budgetTargetAmount || 0) / (totalAddedOptions || 0)) / 365)}
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleBudgetPage;
