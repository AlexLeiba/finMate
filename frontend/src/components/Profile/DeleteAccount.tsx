import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function DeleteAccount() {
  const [openDialog, setOpenDialog] = useState(false);
  async function handleDeleteAccount() {
    console.log("delete account");

    try {
      // await apiFactory().deleteAccount();
      // TODO add delete api
    } catch (error: unknown) {
      console.log("🚀 ~ handleDeleteAccount ~ error:", error);
    }
  }

  return (
    <section className="border border-red-500 p-4 flex flex-col gap-2 ">
      <h4>Danger Zone</h4>
      <p>Permanently delete your account</p>

      <Dialog onOpenChange={setOpenDialog} open={openDialog}>
        <DialogTrigger asChild>
          <Button
            className="self-start"
            variant="destructive"
            classNameChildren="flex items-center gap-1 "
          >
            <Trash /> Delete Account
          </Button>
        </DialogTrigger>

        <DialogContent className="lg:max-w-200 overflow-y-auto lg:h-auto h-full">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">Are you sure?</h4>
            <p>This action cannot be undone, you will lose all your data.</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
