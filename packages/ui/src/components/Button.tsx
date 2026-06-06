import * as React from 'react';

interface ButtonProps {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  
  /**
   * Optional variant for styling
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  
  /**
   * Optional size modifier
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Optional disabled state
   */
  disabled?: boolean;
  
  /**
   * Optional additional class names
   */
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  // Button implementation would go here
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};