/** Props for the shared Button component */
export type ButtonProps = {
  /** The text displayed inside the button */
  label: string;
  /** When true, the button is non-interactive and visually dimmed */
  disabled?: boolean;
  /** Visual variant of the button */
  variant?: "primary" | "secondary";
};

/** Renders a button element with the given label and state */
export function Button({ label, disabled = false, variant = "primary" }: ButtonProps): {
  type: "button";
  label: string;
  disabled: boolean;
  variant: string;
} {
  return {
    type: "button",
    label,
    disabled,
    variant,
  };
}
