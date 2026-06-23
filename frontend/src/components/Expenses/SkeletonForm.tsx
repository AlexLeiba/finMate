import { cn } from "@/lib/utils/tailwindUtils";

export function SkeletonForm({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "lg:h-91.5 h-full bg-background-element-primary animate-pulse ",
        className,
      )}
    ></div>
  );
}
