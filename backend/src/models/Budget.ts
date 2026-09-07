import { Schema, model } from "mongoose";
import { type BudgetOptionsSchemaType, type BudgetSchemaType } from "../schemas/budgets";

const budgetSchema = new Schema<
  BudgetSchemaType & { userId: string; options: BudgetOptionsSchemaType }
>(
  {
    userId: {
      type: String,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    budgetType: {
      type: String,
      required: true,
      default: "savings",
    },
    budgetTargetAmount: {
      type: Number,
      required: false,
    },
    date: {
      type: Date,
      required: false,
      default: new Date(),
    },
    options: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Budget = model("Budget", budgetSchema);
