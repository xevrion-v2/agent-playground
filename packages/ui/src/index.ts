/**
 * Button component props.
 * @property label - Text displayed on the button
 * @property disabled - Whether the button is non-interactive
 * @property variant - Visual style variant
 * @property size - Button size
 * @property onClick - Click handler
 */
export type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

/**
 * Stub Button component for testing.
 * Returns a plain object representing a rendered button.
 */
export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  onClick,
}: ButtonProps) {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size,
    onClick,
  };
}
