export function keyBy<T>(
  values: readonly T[],
  keySelector: (value: T) => string,
): Record<string, T> {
  return values.reduce<Record<string, T>>((record, value) => {
    record[keySelector(value)] = value;
    return record;
  }, {});
}