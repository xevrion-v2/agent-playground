export interface ButtonProps {
  /** The visible label of the button. */
  label: string;
  /** Additional CSS class names to apply to the button. */
  className?: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether the button is in a loading state. */
  loading?: boolean;
  /** Click event handler. */
  onClick?: () => void;
  /** The HTML button type attribute. */
  type?: "button" | "submit" | "reset";
  /** Visual variant of the button. */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  /** Size variant of the button. */
  size?: "sm" | "md" | "lg";
}

export function Button({
  label,
  className,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
}: ButtonProps) {
  return {
    type,
    label,
    disabled,
    loading,
    onClick,
    variant,
    size,
    className,
  };
}
