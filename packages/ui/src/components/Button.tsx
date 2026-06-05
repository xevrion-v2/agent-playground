import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Variant styles for the Button component.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * Props for the shared UI Button.
 * Extends native button attributes while keeping the public API minimal.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. */
  variant?: ButtonVariant;
  /** Content rendered inside the button. */
  children: ReactNode;
}

/**
 * Shared UI Button component.
 * Renders a native `<button>` with optional variant styling.
 */
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...rest }) => {
  const baseStyles = 'px-4 py-2 rounded font-medium';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...rest}>
      {children}
    </button>
  );
};