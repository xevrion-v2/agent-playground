import React from "react";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  label, onClick, variant = "primary", disabled = false, size = "medium", className = "", type = "button",
}) => {
  const base = "rounded px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2";
  const variants: Record<string,string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
  };
  const sizes: Record<string,string> = {
    small: "text-sm px-3 py-1", medium: "text-base", large: "text-lg px-6 py-3",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>{label}</button>
  );
};
