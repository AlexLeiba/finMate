import { Button } from "../ui/button";
import { Download } from "lucide-react";

export function DownloadCsv() {
  return (
    <section className="border p-4 flex flex-col gap-2 ">
      <h4>Export your data</h4>
      <p>Download all your expenses </p>
      <Button
        variant="accent"
        classNameChildren="flex items-center gap-1"
        className="self-start"
      >
        <Download /> Export data
      </Button>
    </section>
  );
}
