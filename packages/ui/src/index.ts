import type { FC, ReactNode } from 'react';

export interface ButtonProps {
  /** The button label text */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class names */
  className?: string;
  /** Button children (overrides label if provided) */
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  children,
}) => {
  return {
    type: "button",
    label: children ?? label,
    disabled,
    onClick,
    variant,
    size,
    className,
  };
};
