import React from 'react';

export interface ButtonProps {
  /** The visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
  /** The size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** The content inside the button */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** HTML type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export function Button({
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  children,
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}