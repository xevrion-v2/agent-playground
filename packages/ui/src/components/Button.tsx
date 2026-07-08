import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Props for the shared Button component.
 * Extends native button attributes while omitting `onClick` to allow a stricter signature.
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Content rendered inside the button */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Size preset affecting padding and font size */
  size?: 'sm' | 'md' | 'lg';
  /** Disables interaction and applies visual disabled state */
  disabled?: boolean;
  /** Click handler with no arguments and no return value */
  onClick?: () => void;
  /** Optional icon rendered before the text */
  leftIcon?: ReactNode;
  /** Optional icon rendered after the text */
  rightIcon?: ReactNode;
  /** When true, the button occupies the full width of its container */
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  const baseStyles = 'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // Map size prop to Tailwind classes
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',

  const classes = [
    baseStyles,
    variantStyles[variant] ?? variantStyles.primary,
    sizeStyles[size] ?? sizeStyles.md,
    disabled && 'opacity-50 cursor-not-allowed',
    fullWidth && 'w-full',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2 inline-flex items-center">{rightIcon}</span>}
    </button>
  );
}

/** Default export for convenience */
export default Button;