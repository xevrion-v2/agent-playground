import React from 'react';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, disabled = false, onClick }) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};