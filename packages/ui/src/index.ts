/** Visual style variant controlling the button's colour scheme. */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/** Size preset controlling the button's padding and font size. */
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  /** The visible text label rendered inside the button. */
  label: string;
  /** When true, the button is non-interactive and visually dimmed. Defaults to false. */
  disabled?: boolean;
  /** Visual style variant. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Size preset. Defaults to "md". */
  size?: ButtonSize;
  /** Optional CSS class names to merge onto the root element. */
  className?: string;
  /** Callback invoked when the button is activated. */
  onClick?: () => void;
};

export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps): Record<string, unknown> {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size,
    className,
    onClick,
  };
}
