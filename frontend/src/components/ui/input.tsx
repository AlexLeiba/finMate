import * as React from "react";

import { cn } from "@/lib/utils/tailwindUtils";
import { Eye, EyeClosed } from "lucide-react";
import { IconButton } from "./iconButton";

function Input({
  className,
  type,
  error,
  label,
  ...props
}: React.ComponentProps<"input"> & { error?: string; label?: string }) {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <div className="flex flex-col justify-start items-start gap-1 relative w-full">
        {label && (
          <label className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            title={label || "Input"}
            aria-label={label || "Input"}
            type={show ? "text" : type}
            data-slot="input"
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:ring-white  focus-visible:ring-[1px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              type === "password" && "pr-10",
              className,
            )}
            {...props}
          />
          {type === "password" && (
            <IconButton
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeClosed /> : <Eye />}
            </IconButton>
          )}
        </div>
        {error && (
          <p data-test="error-message" className="text-destructive text-xs">
            {error}
          </p>
        )}
      </div>
    </>
  );
}

export { Input };
