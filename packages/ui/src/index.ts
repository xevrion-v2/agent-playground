/**
 * Supported visual variants for the Button component.
 */
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

/**
 * Available sizes for the Button component.
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Props for the shared Button stub component.
 *
 * @property label   - The text displayed inside the button.
 * @property disabled - Whether the button is interactive. Defaults to false.
 * @property variant - Visual style variant. Defaults to "primary".
 * @property size    - Button size preset. Defaults to "md".
 * @property onClick - Optional click handler (stub-ready for future wiring).
 */
export type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
};

/**
 * Button stub component.
 *
 * Returns a plain object describing the button configuration.
 * This keeps the public shape unchanged — existing consumers are not affected.
 */
export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  onClick
}: ButtonProps) {
  return {
    type: "button" as const,
    label,
    disabled,
    variant,
    size,
    onClick
  };
}
