import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Props for the shared Button component.
 * Extends native button attributes while keeping the public API minimal.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content rendered inside the button */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Shared UI Button component.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...rest
}) => {
  return <button {...rest}>{children}</button>;
};

export default Button;