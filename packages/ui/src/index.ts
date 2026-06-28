/**
 * Properties for the shared Button component.
 */
export interface ButtonProps {
  /** The text displayed on the button. */
  label: string;
  /** Disables interactions when true. */
  disabled?: boolean;
}

/**
 * A stub implementation of a Button component.
 */
export function Button({ label, disabled = false }: ButtonProps): { type: string; label: string; disabled: boolean } {
  return {
    type: "button",
    label,
    disabled
  };
}
