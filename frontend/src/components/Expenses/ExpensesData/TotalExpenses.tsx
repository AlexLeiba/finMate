import React from "react";

export function TotalExpenses({ total }: { total: number }) {
  return (
    <section className="border p-4 flex flex-col gap-2 rounded-md">
      <p>Total expenses</p>
      <p className="text-xl font-bold">{total} Expenses</p>
    </section>
  );
}
