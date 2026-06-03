export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}

export type InfiniteSequenceOptions<T> = {
  start: T;
  next: (current: T, index: number) => T;
};

export function* infiniteSequence<T>({
  start,
  next
}: InfiniteSequenceOptions<T>): Generator<T, never, unknown> {
  let current = start;
  let index = 0;

  while (true) {
    yield current;
    current = next(current, index);
    index += 1;
  }
}

export function takeFromSequence<T>(
  sequence: Iterable<T>,
  count: number
): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative integer");
  }

  const values: T[] = [];
  for (const value of sequence) {
    if (values.length >= count) {
      break;
    }
    values.push(value);
  }
  return values;
}
