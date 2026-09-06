export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  /** The text label displayed inside the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Optional click handler */
  onClick?: () => void;
  /** Additional CSS class names */
  className?: string;
};

export type ButtonResult = {
  type: "button";
  label: string;
  disabled: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
  className: string;
};

export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size,
    className,
  };
}
