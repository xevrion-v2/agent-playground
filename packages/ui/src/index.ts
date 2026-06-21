/** Props for the shared UI Button component. */
export type ButtonProps = {
  /** Visible text displayed inside the button */
  label: string;
  /** When true, the button is grayed out and non-interactive */
  disabled?: boolean;
};

/**
 * Stub Button component — returns a plain descriptor object.
 *
 * @remarks
 * This is a placeholder until a real framework-level renderer
 * (React, Vue, etc.) is wired into the UI package.
 *
 * @returns An object representing a button element.
 */
export function Button({ label, disabled = false }: ButtonProps): {
  type: "button";
  label: string;
  disabled: boolean;
} {
  return {
    type: "button",
    label,
    disabled,
  };
}
