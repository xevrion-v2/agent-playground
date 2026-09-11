import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

/**
 * Button visual variant
 * - primary: Main call-to-action, high emphasis
 * - secondary: Alternative actions, medium emphasis
 * - danger: Destructive actions (delete, remove)
 * - ghost: Low-emphasis actions, transparent background
 */
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

/**
 * Button size
 * - sm: Compact, for dense UIs
 * - md: Default, standard touch target
 * - lg: Large, prominent actions
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Base button props extending native HTML button attributes
 * Omits native onClick to provide typed handler
 */
export interface BaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Button text content */
  label: string;
  /** Disables the button and applies disabled styling */
  disabled?: boolean;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Shows loading spinner and disables interaction */
  loading?: boolean;
  /** Click handler with typed event */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility when label is not descriptive */
  "aria-label"?: string;
}

/**
 * Full Button component props including ref forwarding
 */
export type ButtonProps = BaseButtonProps & RefAttributes<HTMLButtonElement>;

/**
 * Button component with full TypeScript support and ref forwarding
 *
 * @param props - Button configuration including label, variant, size, state, and event handlers
 * @returns Button element with proper accessibility attributes
 *
 * @example
 * ```tsx
 * <Button
 *   label="Save changes"
 *   variant="primary"
 *   size="md"
 *   onClick={handleSave}
 *   disabled={isSaving}
 *   loading={isSaving}
 * />
 * ```
 */
const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { label, disabled = false, variant = "primary", size = "md", loading = false, onClick, className = "", "aria-label": ariaLabel, ...rest } = props;

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
      aria-disabled={isDisabled}
      aria-busy={loading}
      aria-label={ariaLabel || label}
      {...rest}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      <span className="btn-label">{label}</span>
    </button>
  );
});

/**
 * Button component with full TypeScript support and ref forwarding
 */
export const Button: ForwardRefExoticComponent<ButtonProps> = ButtonComponent;

export type { ButtonHTMLAttributes };