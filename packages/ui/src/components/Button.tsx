import React from 'react';

export interface ButtonProps {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** Click handler for the button */
  onClick?: () => void;
  /** Disables the button when true */
  disabled?: boolean;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
  /** HTML type attribute for the button */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Shared Button component for consistent styling across the application.
 * 
 * @public
 */
export const Button = ({ children, onClick, disabled = false, variant = 'primary', type = 'button', className = '' }: ButtonProps): React.ReactElement => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return <button type={type} className={`${baseStyles} ${variantStyles[variant]} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
};

export default Button;