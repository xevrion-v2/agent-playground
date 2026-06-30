export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({
  label,
  disabled = false,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: ButtonProps) {
  return {
    type,
    label,
    disabled,
    onClick,
    variant,
    size,
    className,
  };
}
