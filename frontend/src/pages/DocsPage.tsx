import { Link } from "@tanstack/react-router";

function DocsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h3>Documentation</h3>
        <p>A concise guide to tracking expenses and planning budgets in FineMate.</p>
      </header>

      <section className="flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4>Dashboard</h4>
          <Link to="/dashboard" className="text-sm underline underline-offset-4">
            Open Dashboard
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h5>Summary</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>Choose From and To dates to refresh the summary for a different date range.</li>
              <li>Review expense count, total, average, and highest and lowest expense amounts.</li>
              <li>Click Highest or Lowest to open matching expenses.</li>
              <li>Click This Month or Previous Month to open expenses from that month.</li>
              <li>Compare the current month total with the previous month percentage change.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Charts and recent activity</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>Choose a reporting period from either chart&apos;s period menu.</li>
              <li>Click a category slice to open expenses filtered to that category.</li>
              <li>Click a Spending Trend point to open expenses from that month.</li>
              <li>Review recent expenses and use a card&apos;s actions to manage a record.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4>Expenses</h4>
          <Link to="/expenses" className="text-sm underline underline-offset-4">
            Open Expenses
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h5>Add and manage</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>Select Add Expense and enter its description, amount, category, and date.</li>
              <li>Use an expense card&apos;s edit or delete action to update or remove it.</li>
              <li>
                Use the page controls to move between result pages when there are over ten items.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Find expenses</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>Search by description, category, or amount; results update as you type.</li>
              <li>Filter by category, start and end date, or minimum and maximum amount.</li>
              <li>Choose to sort by date or amount, in ascending or descending order.</li>
              <li>Remove individual active filters or clear them to return to the full list.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4>Budgets</h4>
          <Link to="/budgets" className="text-sm underline underline-offset-4">
            Open Budgets
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h5>Create and organize</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>
                Choose Savings or Expenses, then select Add New to create a budget of that type.
              </li>
              <li>Open a budget card to change its title, description, date, or target amount.</li>
              <li>Delete a budget from its card in the list.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Track progress</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>Add named amount options to record savings contributions or planned expenses.</li>
              <li>The stats show the target, total of added options, and remaining amount.</li>
              <li>
                When a target and option amounts are available, view estimated time to reach it at
                daily, weekly, or monthly rates.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h4>Settings and data</h4>
          <Link to="/profile" className="text-sm underline underline-offset-4">
            Open Settings
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h5>Profile</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>Select Edit to update your name, display currency, or password.</li>
              <li>Your selected currency is used when displaying monetary values.</li>
              <li>Use Delete Account only when you intend to remove your account.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h5>CSV data</h5>
            <ul className="list-disc space-y-1 pl-5 text-text-secondary">
              <li>
                Choose Upload CSV, select a CSV file, and map its columns to description, date,
                category, and amount.
              </li>
              <li>Review the mapped values, then select Save new expenses to import them.</li>
              <li>Select Download CSV to export your expenses.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DocsPage;
