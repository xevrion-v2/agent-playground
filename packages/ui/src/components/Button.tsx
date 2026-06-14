import React from 'react';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to render inside the button */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Optional additional class names */
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
  ...rest
}: ButtonProps): JSX.Element => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';