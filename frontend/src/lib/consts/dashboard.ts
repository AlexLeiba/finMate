export type CategoryTimePeriod = { label: string; value: number };
const CATEGORY_TIME_PERIOD: CategoryTimePeriod[] = [
  {
    label: "Last 7 days",
    value: 7,
  },
  {
    label: "Last 1 month",
    value: 30,
  },
  {
    label: "Last 3 months",
    value: 90,
  },
  {
    label: "Last 6 months",
    value: 180,
  },
  {
    label: "Last 1 year",
    value: 365,
  },
  {
    label: "Last 2 years",
    value: 730,
  },
  {
    label: "All Time",
    value: 99999,
  },
] as const;

export { CATEGORY_TIME_PERIOD };
