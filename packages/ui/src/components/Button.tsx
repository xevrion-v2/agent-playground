import React from 'react';

/**
 * Shared Button component props.
 * Extend this interface when creating button variants.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disables the button and applies disabled styling */
  disabled?: boolean;
  /** Loading state - shows a spinner and disables interactions */
  loading?: boolean;
  /** Optional icon rendered before the button text */
  leftIcon?: React.ReactNode;
  /** Optional icon rendered after the button text */
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  ...rest
}) => {
  return (
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="button-loading">Loading...</span>
      ) : (
        <>
          {leftIcon && <span className="button-icon button-icon-left">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="button-icon button-icon-right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};