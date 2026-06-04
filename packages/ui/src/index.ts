/** Available button visual variants. */
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

/** Available button sizes. */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Props for the shared Button component.
 *
 * `label` and `disabled` are the original props.
 * `variant`, `size`, and `onClick` are optional extensions with sensible defaults.
 */
export type ButtonProps = {
  /** Button text content. */
  label: string;
  /** Whether the button is disabled. Defaults to false. */
  disabled?: boolean;
  /** Visual variant. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Size preset. Defaults to "md". */
  size?: ButtonSize;
  /** Click handler. */
  onClick?: () => void;
};

export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  onClick
}: ButtonProps) {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size,
    onClick
  };
}
