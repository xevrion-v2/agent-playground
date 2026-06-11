import React from 'react';

export interface ButtonProps {
  /** The content to display inside the button */
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click event handler */
  onClick?: () => void;
  /** The type of button */
  type?: 'button' | 'submit' | 'reset';
  /** The variant style of the button */
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', disabled = false, onClick, type = 'button', variant = 'primary' }) => {
  const variantClasses = variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : variant === 'secondary' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700';
  return <button className={`${className} ${variantClasses} px-4 py-2 rounded text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`} disabled={disabled} onClick={onClick} type={type}>{children}</button>;
};