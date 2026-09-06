export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  /** Display text for the button */
  label: string;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export interface ButtonRender {
  type: "button";
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}: ButtonProps): ButtonRender {
  return {
    type: "button",
    label,
    variant,
    size,
    disabled,
    ...(onClick && { onClick }),
  } as ButtonRender;
}
