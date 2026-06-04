/**
 * Props for the shared Button component.
 * @property label - The text displayed on the button.
 * @property disabled - Whether the button is disabled. Defaults to false.
 * @property variant - Optional visual variant (e.g. "primary", "secondary").
 * @property onClick - Optional click handler for the button.
 */
export type ButtonProps = {
  /** The text displayed on the button. */
  label: string;
  /** Whether the button is disabled. Defaults to false. */
  disabled?: boolean;
  /** Optional visual variant for styling purposes. */
  variant?: "primary" | "secondary";
  /** Optional click handler. */
  onClick?: () => void;
};

/**
 * A simple Button component for the TaskFlow UI.
 * Renders a button element with the given label and disabled state.
 *
 * @param props - Button properties including label and disabled flag.
 * @returns A plain object representing the button (pre-render stub).
 */
export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}
