type CategoryTimePeriod = { label: string; value: number };
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
type TrendTimePeriod = { label: string; value: number };
const TREND_TIME_PERIOD: TrendTimePeriod[] = [
  {
    label: "Last 6 months",
    value: 6,
  },
  {
    label: "Last month",
    value: 1,
  },
  {
    label: "Last 2 months",
    value: 2,
  },
  {
    label: "Last 3 months",
    value: 3,
  },

  {
    label: "Last year",
    value: 12,
  },
  {
    label: "Last 2 years",
    value: 24,
  },
  {
    label: "All Time",
    value: 99999,
  },
] as const;

const TIME_PERIOD_IN_DAYS_DEFAULT = 7;
const TIME_PERIOD_IN_MONTHS_DEFAULT = 6;

const MAX_PERIOD_IN_DAYS = 730;

export {
  CATEGORY_TIME_PERIOD,
  TIME_PERIOD_IN_DAYS_DEFAULT,
  MAX_PERIOD_IN_DAYS,
  TIME_PERIOD_IN_MONTHS_DEFAULT,
  TREND_TIME_PERIOD,
  type CategoryTimePeriod,
  type TrendTimePeriod,
};
