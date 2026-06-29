import React from 'react';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * A shared UI Button stub.
 * Exposes predictable label and disabled values for testing.
 */
export const Button: React.FC<ButtonProps> = ({ label, disabled = false, onClick }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      data-testid="ui-button"
    >
      {label}
    </button>
  );
};

export default Button;