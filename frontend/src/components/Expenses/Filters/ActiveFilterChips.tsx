export function ActiveFilterChips({ value }: { value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1 border p-1 px-2 rounded-md bg-background-element-accent">
        {value}
      </div>
    </div>
  );
}
