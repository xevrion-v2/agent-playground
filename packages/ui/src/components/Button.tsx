import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to render inside the button */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Optional icon to display before the button text */
  leftIcon?: ReactNode;
  /** Optional icon to display after the button text */
  rightIcon?: ReactNode;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Full width button spanning its container */
  isFullWidth?: boolean;
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary',
  leftIcon,
  rightIcon,
  isLoading,
  isFullWidth,
  size = 'md',
  type = 'button',
  className,
  ...rest
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100'
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${isFullWidth ? 'w-full' : ''} ${className ?? ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="mr-2 animate-spin">⟳</span>}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};