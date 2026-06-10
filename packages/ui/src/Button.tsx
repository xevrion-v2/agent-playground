import React from 'react';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export function Button({ label, disabled = false }: ButtonProps) {
  return (
    <button disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;