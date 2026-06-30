export type DateRangeInput = {
  from?: string | Date;
  to?: string | Date;
};

export type DateRange = {
  from?: Date;
  to?: Date;
};

function parseOptionalDate(value: string | Date | undefined) {
  if (!value) {
    return undefined;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function parseDateRange(input: DateRangeInput = {}): DateRange {
  return {
    from: parseOptionalDate(input.from),
    to: parseOptionalDate(input.to),
  };
}