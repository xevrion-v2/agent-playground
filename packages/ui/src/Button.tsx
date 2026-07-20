import React from 'react';

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      {...props}>
      {label}
    </button>
  );
};