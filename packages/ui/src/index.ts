export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  /** The text displayed on the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Optional click handler */
  onClick?: () => void;
};

export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
}: ButtonProps) {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size,
  };
}
