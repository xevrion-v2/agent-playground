import React from 'react';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, disabled = false }) => {
  return (
    <button 
      disabled={disabled}
      onClick={() => console.log('Button clicked:', label)}
    >
      {label}
    </button>
  );
};

export default Button;