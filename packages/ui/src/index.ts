/**
 * Props for the Button component.
 */
export type ButtonProps = {
  /** The button label text. */
  label: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
};

/**
 * The shape returned by the Button factory function.
 */
export type ButtonReturn = {
  type: "button";
  label: string;
  disabled: boolean;
};

/**
 * Create a button descriptor object.
 * @param props - The button properties.
 * @returns A button descriptor with type, label, and disabled state.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled,
  };
}
