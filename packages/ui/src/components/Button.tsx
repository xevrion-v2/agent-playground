import React from 'react';

export interface ButtonProps {
  /** The visual variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** The size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button shows a loading state */
  loading?: boolean;
  /** Optional icon to display before the button text */
  icon?: React.ReactNode;
  /** The content of the button */
  children?: React.ReactNode;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional CSS class names */
  className?: string;
  /** The HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  children,
  onClick,
  className,
  type = 'button',
  ariaLabel,
}) => {
  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={className} aria-label={ariaLabel}>
      {loading ? <span>Loading...</span> : icon}{children}
    </button>
  );
};