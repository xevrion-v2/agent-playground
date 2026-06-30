export type PartitionResult<T> = {
  pass: T[];
  fail: T[];
};

export function partitionArray<T>(
  values: readonly T[],
  predicate: (value: T) => boolean,
): PartitionResult<T> {
  return values.reduce<PartitionResult<T>>(
    (result, value) => {
      result[predicate(value) ? 'pass' : 'fail'].push(value);
      return result;
    },
    { pass: [], fail: [] },
  );
}