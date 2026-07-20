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

export function approximatePi(iterations = 1_000): number {
  if (!Number.isInteger(iterations) || iterations <= 0) {
    throw new RangeError("iterations must be a positive integer");
  }

  let sum = 0;

  for (let index = 0; index < iterations; index += 1) {
    const denominator = 2 * index + 1;
    sum += (index % 2 === 0 ? 1 : -1) / denominator;
  }

  return sum * 4;
}
