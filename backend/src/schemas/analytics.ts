import * as zod from "zod";

export const timePeriodInMonthsSchema = zod.object({
  timePeriodInMonths: zod.coerce.number().optional().default(6),
});

export const getAllDashboardStatsQuerySchema = zod.object({
  startDate: zod.coerce.date().optional(),
  endDate: zod.coerce.date().optional(),
});
