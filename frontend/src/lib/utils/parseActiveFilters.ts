export function parseActiveFilters(
  activeFilter: string | number | Date,
): string | number {
  if (typeof activeFilter === "string" || typeof activeFilter === "number") {
    return activeFilter;
  }
  if (activeFilter instanceof Date) {
    return activeFilter.toLocaleDateString();
  }
  return activeFilter;
}
