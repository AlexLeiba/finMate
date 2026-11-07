import { cn } from "@/lib/utils/tailwindUtils";
import type { ComponentProps } from "react";

export function StatCard({
  title,
  value,
  icon,
  iconClassName,
  ...rest
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  iconClassName?: string;
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
        <div className={cn("grid size-8 shrink-0 place-items-center rounded-md", iconClassName)}>
          {icon}
        </div>
        <p className="text-text-secondary">{title}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </button>
  );
}
