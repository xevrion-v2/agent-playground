import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Props for the shared Button component.
 * Extends native button attributes while keeping the public API surface minimal.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button. */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Optional icon rendered before the button text. */
  leftIcon?: ReactNode;
  /** Optional icon rendered after the button text. */
  rightIcon?: ReactNode;
}

/**
 * Shared UI Button stub with typed props.
 *
 * @param props - Button props including variant, icons, and native button attributes.
 * @returns A styled button element.
 */
export function Button({ children, variant = 'primary', leftIcon, rightIcon, ...props }: ButtonProps): JSX.Element {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
  };

  return (
    <button type="button" className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}