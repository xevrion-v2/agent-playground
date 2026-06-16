export interface ButtonProps {
  /** The visible label of the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Button variant */
  variant?: "primary" | "secondary" | "ghost";
  /** Additional CSS class names */
  className?: string;
}

export function Button({
  label,
  disabled = false,
  onClick,
  variant = "primary",
  className
}: ButtonProps) {
  return {
    type: "button",
    label,
    disabled,
    onClick,
    variant,
    className
  };
}
