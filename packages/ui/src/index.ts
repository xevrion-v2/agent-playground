/**
 * Props for the Button component.
 */
export type ButtonProps = {
  /** Text displayed inside the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
};

/**
 * A reusable button component stub.
 *
 * @param props - The button properties
 * @returns A button object with type, label and disabled state
 */
export function Button({ label, disabled = false }: ButtonProps): {
  type: string;
  label: string;
  disabled: boolean;
} {
  return {
    type: button,
    label,
    disabled,
  };
}
