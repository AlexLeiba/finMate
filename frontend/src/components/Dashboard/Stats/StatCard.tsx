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
      className="text-left cursor-pointer flex flex-col justify-between gap-1 border p-4 border-border hover:border-accent-foreground rounded-md"
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
