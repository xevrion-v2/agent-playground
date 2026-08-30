export const version = '0.1.0';

/**
 * Returns true if the string contains a carriage return character (\r).
 */
export function isCarriageReturnSymbolPresent(value: string): boolean {
  return value.includes('\r');
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
