export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  /** The visible text on the button */
  label: string;
  /** Disables the button when true */
  disabled?: boolean;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** HTML button type attribute */
  type?: ButtonType;
  /** Optional click handler */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
}

export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  className
}: ButtonProps) {
  return {
    type,
    label,
    disabled,
    variant,
    size,
    onClick,
    className
  };
}
