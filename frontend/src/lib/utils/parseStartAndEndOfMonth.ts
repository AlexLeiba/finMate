export function parseStartAndEndOfMonth(selectedMonth: Date) {
  const year = selectedMonth.getFullYear();
  const monthNumber = selectedMonth.getMonth();
  const startOfMonth = new Date(year, monthNumber, 1);
  const endOfMonth = new Date(year, monthNumber + 1, 0);
  return { startOfMonth, endOfMonth };
}
