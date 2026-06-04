/** Props accepted by the Button component. */
export type ButtonProps = {
  /** The visible text label rendered inside the button. */
  label: string;
  /** When true, the button is non-interactive. Defaults to false. */
  disabled?: boolean;
  /** The HTML button type. Defaults to "button" to avoid accidental form submissions. */
  type?: "button" | "submit" | "reset";
  /** Optional click handler invoked when the button is activated. */
  onClick?: () => void;
};

/**
 * Button — a minimal shared UI primitive.
 *
 * Returns a plain object representation of a button element so it can be
 * consumed by any renderer (React, Vue, or a test harness) without coupling
 * this package to a specific framework.
 *
 * @param props - {@link ButtonProps}
 * @returns A plain object describing the button's properties.
 *
 * @example
 * const btn = Button({ label: "Save", disabled: false });
 * // { type: "button", label: "Save", disabled: false }
 */
export function Button({ label, disabled = false, type = "button", onClick }: ButtonProps) {
  return {
    type,
    label,
    disabled,
    onClick
  };
}
