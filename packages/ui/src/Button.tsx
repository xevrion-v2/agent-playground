import React from "react";

export interface ButtonProps {
  /** Button label text */
  label: string;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button variant */
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
  variant = "primary",
}) => {
  return (
    <button disabled={disabled} onClick={onClick} data-variant={variant}>
      {label}
    </button>
  );
};

export default Button;
