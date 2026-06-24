import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils/tailwindUtils";
import { Search, X } from "lucide-react";

function InputSearch({
  className,
  type,
  error,
  label,
  onClear,
  ...props
}: React.ComponentProps<"input"> & {
  error?: string;
  label?: string;
  onClear: () => void;
}) {
  function handleClear() {
    if (props.onChange) {
      const event = {
        target: {
          value: "",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(event);

      onClear();
    }
  }
  return (
    <div className="flex flex-col justify-start items-start gap-1 relative">
      {label && (
        <label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border  pl-8 pr-8 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:ring-white  focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          )}
          {...props}
        />
        <Search className={cn("absolute left-2 top-1/2 -translate-y-1/2")} />
        <IconButton
          style={{
            display: props.value ? "block" : "none",
          }}
          onClick={handleClear}
          className={cn("absolute right-2 top-1/2 -translate-y-1/2")}
        >
          <X size={20} className={cn("text-white")} />
        </IconButton>
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

export { InputSearch };
