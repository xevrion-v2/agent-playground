interface DateRange { start?: Date; end?: Date; }

const parseDateRange = (from?: string, to?: string): DateRange => {
  const result: DateRange = {};
  if (from) { const d = new Date(from); if (!isNaN(d.getTime())) result.start = d; }
  if (to) { const d = new Date(to); if (!isNaN(d.getTime())) result.end = d; }
  return result;
};

export { parseDateRange, DateRange };
