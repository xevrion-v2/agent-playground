/**
 * Returns true if the string contains the ASCII form feed control character (\f, U+000C).
 */
export function isFormFeedSymbolPresent(value: string): boolean {
  return value.includes('\f');
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
