/**
 * Returns true if the string contains a tab character (U+0009).
 */
export function isTabSymbolPresent(value: string): boolean {
  return value.includes('\t');
}
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
