import React from 'react';

export interface ButtonProps {
  /** Button variant style */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button shows a loading state */
  loading?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS class names */
  className?: string;
  /** Button label or content */
  children?: React.ReactNode;
  /** Accessible label for icon-only buttons */
  ariaLabel?: string;
  /** Whether the button takes full width of its container */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  children,
  ariaLabel,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''} ${className}`}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? <span className="btn-spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
};

export default Button;