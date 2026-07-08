import React from 'react';

export interface ButtonProps {
  /** The visual style variant of the button */
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
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** The button type attribute */
  type?: 'button' | 'submit' | 'reset';
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
  icon,
  children,
  className,
  onClick,
  type = 'button',
  ariaLabel,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
    >{children}</button>
  );
};