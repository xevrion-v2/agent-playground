import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ label, disabled = false, onClick, variant = "primary", className, children }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled,
    onClick,
    variant,
    className,
    children
  };
}
