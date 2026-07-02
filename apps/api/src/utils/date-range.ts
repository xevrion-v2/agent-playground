export type DateRangeInput = {
  from?: Date | string;
  to?: Date | string;
};

export type DateRange = {
  from?: Date;
  to?: Date;
};

function parseOptionalDate(value: Date | string | undefined): Date | undefined {
  if (value === undefined || value === "") {
    return undefined;
  }

  const parsed = value instanceof Date ? new Date(value) : new Date(value);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function parseDateRange(input: DateRangeInput = {}): DateRange {
  return {
    from: parseOptionalDate(input.from),
    to: parseOptionalDate(input.to),
  };
}
