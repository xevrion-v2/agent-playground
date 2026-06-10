import * as React from 'react';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ label, disabled = false, onClick, variant = 'primary' }: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};