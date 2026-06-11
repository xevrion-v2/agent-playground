import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Props for the shared Button component.
 * Extends native button attributes while keeping the public API surface minimal.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
};

/**
 * Shared UI Button component.
 * Renders a styled `<button>` with support for primary, secondary, and danger variants.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...rest
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
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