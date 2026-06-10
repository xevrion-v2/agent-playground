import React from 'react';

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, disabled = false }) => {
  return (
    <button 
      disabled={disabled}
      style={{
        padding: '8px 16px',
        backgroundColor: disabled ? '#cccccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      {label}
    </button>
  );
};