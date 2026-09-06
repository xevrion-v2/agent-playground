export function range(start: number, end: number): number[] {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new RangeError("range bounds must be finite integers");
  }

  const values: number[] = [];
  const step = start <= end ? 1 : -1;

  for (
    let value = start;
    step > 0 ? value <= end : value >= end;
    value += step
  ) {
    values.push(value);
  }

  return values;
}
