import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonType = "button" | "submit" | "reset";

export type ButtonProps = {
  /** Text displayed inside the button */
  label: string;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size preset */
  size?: ButtonSize;
  /** HTML button type attribute */
  type?: ButtonType;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button takes full width of its container */
  fullWidth?: boolean;
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional CSS class names */
  className?: string;
  /** Accessible aria-label */
  ariaLabel?: string;
};

export type ButtonReturn = {
  type: "button";
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  htmlType: ButtonType;
  disabled: boolean;
  fullWidth: boolean;
  className: string | undefined;
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  fullWidth = false,
  onClick,
  className,
  ariaLabel,
}: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    variant,
    size,
    htmlType: type,
    disabled,
    fullWidth,
    className,
  };
}
