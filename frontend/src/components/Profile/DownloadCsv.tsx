import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { toast } from "react-toastify";
import { apiFactory } from "@/api/services/apiFactory";
import { downloadExpensesCSV } from "@/lib/utils/downloadExpensesCsv";

export function DownloadCsv() {
  async function handleDownload() {
    try {
      const response = await apiFactory().getAllExpenses();
      downloadExpensesCSV(response.expenses);
    } catch (error: unknown) {
      toast.error(error as string);
    }
    console.log("download");
    // downloadExpensesCSV(expenses);
  }
  return (
    <section className="border p-4 flex flex-col gap-2 ">
      <h4>Export your data</h4>
      <p>Download all your expenses </p>
      <Button
        onClick={handleDownload}
        variant="accent"
        classNameChildren="flex items-center gap-1"
        className="self-start"
      >
        <Download /> Export data
      </Button>
    </section>
  );
}
