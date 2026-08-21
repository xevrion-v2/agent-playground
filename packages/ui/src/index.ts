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

export type PiEstimate = {
    value: number;
    iterations: number;
    method: "leibniz";
};

/**
 * Estimates PI with the Leibniz series: pi = 4 * (1 - 1/3 + 1/5 - 1/7 ...).
 * More iterations improve accuracy while keeping the implementation lightweight.
 */
export function estimatePi(iterations = 10000): PiEstimate {
    const safeIterations = Math.max(1, Math.floor(iterations));
    let sum = 0;

  for (let index = 0; index < safeIterations; index += 1) {
        const denominator = 2 * index + 1;
        sum += index % 2 === 0 ? 1 / denominator : -1 / denominator;
  }

  return {
        value: sum * 4,
        iterations: safeIterations,
        method: "leibniz"
  };
}
