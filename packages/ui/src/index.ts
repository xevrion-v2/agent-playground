import { type HTMLAttributes, type ReactNode } from "react";

/**
 * Supported visual variants for the Button component.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/**
 * Supported size options for the Button component.
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Props for the shared Button component.
 *
 * Extends standard HTML button attributes to allow native props
 * like `aria-label`, `id`, `className`, etc. to be forwarded.
 */
export interface ButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  /** The text label displayed inside the button. */
  label: string;

  /** Whether the button is disabled. @default false */
  disabled?: boolean;

  /** Visual variant of the button. @default "primary" */
  variant?: ButtonVariant;

  /** Size of the button. @default "md" */
  size?: ButtonSize;

  /** Optional icon element rendered before the label. */
  icon?: ReactNode;

  /** Whether the button is in a loading state. @default false */
  loading?: boolean;

  /** Optional click handler. */
  onClick?: (event: MouseEvent) => void;
}

/**
 * A shared, accessible Button stub.
 *
 * Returns a plain object describing the button for rendering
 * by the host framework (React, Vue, etc.).
 *
 * @example
 * ```ts
 * const btn = Button({ label: "Submit" });
 * // => { type: "button", label: "Submit", disabled: false }
 * ```
 */
export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  onClick,
  ...rest
}: ButtonProps): {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
  readonly variant: ButtonVariant;
  readonly size: ButtonSize;
  readonly icon: ReactNode | undefined;
  readonly loading: boolean;
} {
  return {
    type: "button",
    label,
    disabled: disabled || loading,
    variant,
    size,
    icon,
    loading,
  } as const;
}
