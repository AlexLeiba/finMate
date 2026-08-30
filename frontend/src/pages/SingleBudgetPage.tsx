import { DEFAULT_CURRENCY } from "@/lib/consts/currency";
import { Route } from "@/routes/(app)/_protected/budgets/$budgetId";
import { useAuthStore } from "@/store/useAuthStore";
import { useBudgetsStore } from "@/store/useBudgetsStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";

import { createBudgetSchema, type CreateBudgetSchemaType } from "@/lib/schemas/forms/budgetsSchema";

import { DropDownBudgetType } from "@/components/Budgets/DropDownBudgetType";
import { useNavigate } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";

function SingleBudgetPage() {
  const [addOption, setAddOption] = useState(false);
  const params = Route.useParams();
  const navigate = useNavigate();

  const { getSingleBudget, singleBudget, budgetType, createBudget, isLoading } = useBudgetsStore(
    useShallow((state) => {
      return {
        getAllBudgets: state.getAllBudgets,
        budgetType: state.budgetType,
        getSingleBudget: state.getSingleBudget,
        singleBudget: state.singleBudget,
        createBudget: state.createBudget,
        isLoading: state.isLoading,
      };
    })
  );

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

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "options",
  });

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

  console.log("🚀 ~ SingleBudgetPage ~ singleBudget:", singleBudget);

  const currency = useAuthStore((state) => state.user?.currency) || DEFAULT_CURRENCY;

  useEffect(() => {
    toast.loading("Loading...", { toastId: "fetchExpenses" });
    try {
      getSingleBudget(params?.budgetId);
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      toast.dismiss("fetchExpenses");
    }
  }, [budgetType]);

  return (
    <div className="flex flex-col gap-2 relative h-full">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="line-clamp-1">{singleBudget?.title}</h3>
          <p>{singleBudget?.description}</p>
        </div>

        <FormProvider {...formMethods}>
          <DropDownBudgetType disabled={isLoading} name="budgetType" />
        </FormProvider>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        autoComplete="off"
        className="flex flex-col gap-4  w-full  p-4"
      >
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
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-2">
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
        </div>

        <div className=" grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {!addOption && (
            <Button className="w-full" onClick={() => setAddOption(true)}>
              <div className="flex items-center gap-1 justify-center">
                Add {singleBudget?.budgetType} <Plus />
              </div>
            </Button>
          )}

          {addOption && (
            <div className="flex flex-col gap-2 border rounded-md p-4">
              {fields?.length === 0 ? (
                <div className="flex flex-col gap-2 border rounded-md p-4">
                  <div className="flex items-center justify-between gap-1 ">
                    <p>{singleBudget?.budgetType?.toUpperCase()} 1</p>
                    <Button
                      variant="ghost"
                      className="w-8 h-8 rounded-full"
                      onClick={() => remove(1)}
                    >
                      <X />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      label="Title"
                      disabled={isLoading}
                      placeholder="Type your title"
                      error={errors.options?.[0]?.title?.message}
                      {...register(`options.${0}.title`)}
                    />
                    <Input
                      label="Amount"
                      disabled={isLoading}
                      placeholder="99.99"
                      type="number"
                      error={`${errors.options?.[0]?.amount?.message}`}
                      {...register(`options.${0}.amount`)}
                    />
                  </div>
                  <Button className="w-full" onClick={() => append({ title: "", amount: 0 })}>
                    <div className="flex items-center gap-1 justify-center">
                      Add <Plus />
                    </div>
                  </Button>
                </div>
              ) : (
                fields?.map((field, index) => {
                  return (
                    <div key={field.id} className="flex flex-col gap-2 border rounded-md p-4">
                      <div className="flex items-center justify-between gap-1 ">
                        <p>
                          {singleBudget?.budgetType?.toUpperCase()} {index + 1}
                        </p>
                        <Button
                          variant="ghost"
                          className="w-8 h-8 rounded-full"
                          onClick={() => remove(index + 1)}
                        >
                          <X />
                        </Button>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Input
                          disabled={isLoading}
                          label="Title"
                          placeholder="Type your title"
                          error={errors.title?.message}
                          {...register(`options.${index}.title`)}
                        />

                        <Input
                          label="Amount"
                          disabled={isLoading}
                          placeholder="99.99"
                          type="number"
                          error={`${errors.options?.[index]?.amount?.message}`}
                          {...register(`options.${index}.amount`)}
                        />
                        <Button className="w-full" onClick={() => append({ title: "", amount: 0 })}>
                          <div className="flex items-center gap-1 justify-center">
                            Add <Plus />
                          </div>
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
          <div className="p-2 border rounded-md flex flex-col gap-2">
            <h4 className="text-center">Your {singleBudget?.budgetType} Stats</h4>

            <p>Budget target: {singleBudget?.budgetTargetAmount}</p>
            <p>Total savings: {singleBudget?.budgetTargetAmount}</p>
            <p>Savings left to add: {singleBudget?.budgetTargetAmount}</p>
            <ul className="list-disc list-inside ml-4">
              <li>Daily:1</li>
              <li>Weekly:1</li>
              <li>Monthly:1</li>
              <li>Yearly:1</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 fixed bottom-20 right-2 ">
          <Button loading={isLoading} variant={"accent"} className="w-50">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SingleBudgetPage;
