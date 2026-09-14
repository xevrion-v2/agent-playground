import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = {
  label?: ReactNode;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A reusable Button component for the TaskFlow UI package.
 *
 * Renders a native <button> element with the provided label and props.
 * Extends standard button HTML attributes for full flexibility.
 */
export function Button({
  label,
  disabled = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type="button" disabled={disabled} {...rest}>
      {label ?? children}
    </button>
  );
}
