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

export type SequenceOptions = {
  start?: number;
  step?: number;
};

export function* infiniteSequence({
  start = 0,
  step = 1
}: SequenceOptions = {}): Generator<number, never, void> {
  let current = start;

  while (true) {
    yield current;
    current += step;
  }
}
