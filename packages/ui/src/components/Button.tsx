import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to render inside the button */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg' | 'icon';
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional icon to display before the text */
  leftIcon?: ReactNode;
  /** Optional icon to display after the text */
  rightIcon?: ReactNode;
  /** Full width button */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  ...rest
}) => {
    <button
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >