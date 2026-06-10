import React from 'react';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({ label, disabled = false, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
