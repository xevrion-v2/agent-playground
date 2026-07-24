/**
 * Props for the Button component.
 */
export type ButtonProps = {
  /** The text label displayed on the button */
  label: string;
  /** Whether the button is disabled (defaults to false) */
  disabled?: boolean;
  /** The HTML button type: "button", "submit", or "reset" (defaults to "button") */
  type?: "button" | "submit" | "reset";
  /** Optional click handler */
  onClick?: () => void;
};

/**
 * Creates a button object with the given props.
 *
 * @param props - The button configuration
 * @returns A button object with type, label, disabled, and onClick fields
 *
 * @example
 * ```ts
 * const btn = Button({ label: "Submit", type: "submit", onClick: () => console.log("clicked") });
 * ```
 */
export function Button({ label, disabled = false, type = "button", onClick }: ButtonProps) {
  return {
    type,
    label,
    disabled,
    onClick
  };
}
