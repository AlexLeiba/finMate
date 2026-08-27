import { GenerateExpensesModal } from "@/components/Profile/UploadCsv/GenerateExpensesModal";

export function UploadCsv() {
  return (
    <section className="border p-4 flex flex-col gap-2 ">
      <h4>Upload your data</h4>
      <p>Upload all your expenses </p>

      <GenerateExpensesModal />
    </section>
  );
}
