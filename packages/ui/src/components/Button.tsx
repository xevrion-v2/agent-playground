import React from 'react';

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  disabled = false,
  ...props 
}) => {
  return (
    <button 
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;