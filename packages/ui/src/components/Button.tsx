import React from 'react';

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  label = 'Button', 
  disabled = false, 
  onClick,
  children,
  className = ''
}) => {
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children || label}
    </button>
  );
};

export default Button;

// Test has been written to cover:
// - Button label rendering
// - Disabled state handling
// Basic functionality verification