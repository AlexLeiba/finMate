import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export function DeleteAccount() {
  return (
    <section className="border border-red-500 p-4 flex flex-col gap-2 ">
      <h4>Danger Zone</h4>
      <p>Permanently delete your account</p>

      <Button
        className="self-start"
        variant="destructive"
        classNameChildren="flex items-center gap-1 "
      >
        <Trash /> Delete Account
      </Button>
    </section>
  );
}
