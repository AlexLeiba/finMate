import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogFooter } from "../ui copy/dialog";

// import { SkeletonForm } from "../SkeletonForm";

export function ModalDelete({
  title,
  description,
  children,
  onSubmit,
  onOpenChange,
  open,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="lg:max-w-200 overflow-y-auto lg:h-auto h-full flex flex-col gap-4">
        <h4 className="text-lg font-semibold">{title}</h4>

        <p>{description || "Are you sure? This action cannot be undone"}</p>
        <DialogFooter>
          <Button
            title={`cancel`}
            aria-label={`cancel`}
            variant="outline"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            title={`delete`}
            aria-label={`delete`}
            onClick={onSubmit}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
