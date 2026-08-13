/**
 * Supported visual styles for the Button component.
 * - `"primary"` – Main call-to-action style
 * - `"secondary"` – Less prominent actions
 * - `"danger"` – Destructive or warning actions
 */
export type ButtonVariant = "primary" | "secondary" | "danger";

/**
 * Supported size presets for the Button component.
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Props accepted by the {@link Button} component.
 */
export type ButtonProps = {
  /** The visible text rendered inside the button. */
  label: string;
  /** When `true` the button is non-interactive. Defaults to `false`. */
  disabled?: boolean;
  /** Visual variant of the button. Defaults to `"primary"`. */
  variant?: ButtonVariant;
  /** Size preset for the button. Defaults to `"md"`. */
  size?: ButtonSize;
  /** Optional click handler invoked when the button is activated. */
  onClick?: () => void;
  /** Optional CSS class name(s) to apply to the button element. */
  className?: string;
};

/**
 * Describes the object returned by the {@link Button} factory function.
 */
export interface ButtonOutput {
  /** The HTML element type. Always `"button"`. */
  type: "button";
  /** The visible label text. */
  label: string;
  /** Whether the button is disabled. */
  disabled: boolean;
  /** The visual variant applied to the button. */
  variant: ButtonVariant;
  /** The size preset applied to the button. */
  size: ButtonSize;
  /** The optional click handler. */
  onClick?: () => void;
  /** The optional CSS class name(s). */
  className?: string;
}

/**
 * Creates a button descriptor object for the TaskFlow UI.
 *
 * This is a lightweight stub that returns a plain object representing
 * the button's properties. It will be replaced with a full React
 * component once the frontend framework is wired up.
 *
 * @param props - The button configuration options
 * @returns A {@link ButtonOutput} descriptor object
 *
 * @example
 * ```ts
 * const btn = Button({ label: "Save", variant: "primary" });
 * // => { type: "button", label: "Save", disabled: false, variant: "primary", size: "md" }
 * ```
 */
export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  onClick,
  className,
}: ButtonProps): ButtonOutput {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size,
    ...(onClick && { onClick }),
    ...(className && { className }),
  };
}
