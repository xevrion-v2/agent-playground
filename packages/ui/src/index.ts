/**
 * Button component props for TaskFlow UI.
 *
 * @property label — Accessible button text.
 * @property disabled — Whether the button is in a disabled state.
 */
export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/**
 * Renders a button stub object.
 *
 * @param props — Button component properties.
 * @returns A button descriptor object.
 */
export function Button({ label, disabled = false }: ButtonProps): {
  type: "button";
  label: string;
  disabled: boolean;
} {
  return {
    type: "button",
    label,
    disabled
  };
}
