/**
 * Returns true if the provided string contains a horizontal tab character (U+0009).
 */
export function isTabSymbolPresent(value: string): boolean {
  return value.includes('\t');
}

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
