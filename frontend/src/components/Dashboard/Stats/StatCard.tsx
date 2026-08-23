import { cn } from "@/lib/utils/tailwindUtils";
import type { ComponentProps } from "react";

export function StatCard({
  title,
  value,
  icon,
  ...rest
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
} & ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "text-left flex flex-col justify-between gap-1 border p-4 border-border rounded-md",
        rest.onClick
          ? "cursor-pointer hover:border-accent-foreground border-background-element-accent"
          : ""
      )}
      {...rest}
    >
      <div className="flex gap-2">
        <div className="p-1 size-7 bg-accent rounded-md text-black">{icon}</div>
        <p className="text-text-secondary">{title}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </button>
  );
}
