export const UI_VERSION = '1.0.0';

/**
 * Returns true if the string contains the vertical tab control character (\v / U+000B).
 */
export function isVerticalTabSymbolPresent(value: string): boolean {
  return value.includes('\v');
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
