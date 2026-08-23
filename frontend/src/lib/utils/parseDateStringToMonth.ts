export function parseDateStringToDate(dateString: string): Date {
  const month = dateString.split("-")[0];
  const year = dateString.split("-")[1];
  const date = new Date(`${year}-${month}-01T00:00:00.000Z`);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  return date;
}
