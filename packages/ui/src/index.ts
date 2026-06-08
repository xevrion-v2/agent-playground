/**
 * Shared UI Components
 */
export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonProps = {
  /** Visible button text */
  label: string;
  /** Disables interaction when true */
  disabled?: boolean;
  /** Visual style variant */
  variant?: ButtonVariant;
};

/**
 * Render a button element.
 * @param props - Button configuration
 * @returns A plain button object
 */
export function Button({ label, disabled = false, variant = "primary" }: ButtonProps): {
  type: "button";
  label: string;
  disabled: boolean;
  variant: ButtonVariant;
} {
  return { type: "button", label, disabled, variant };
}
