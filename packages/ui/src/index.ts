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

export type NumberSequenceOptions = {
    start?: number;
    step?: number;
};

export function* createNumberSequence({
    start = 0,
    step = 1
}: NumberSequenceOptions = {}): IterableIterator<number> {
    let current = start;

  while (true) {
        yield current;
        current += step;
  }
}

export function takeSequenceValues(
    sequence: Iterable<number>,
    count: number
  ): number[] {
    const safeCount = Math.max(0, Math.floor(count));
    const values: number[] = [];

  for (const value of sequence) {
        if (values.length >= safeCount) {
                break;
        }

      values.push(value);
  }

  return values;
}
