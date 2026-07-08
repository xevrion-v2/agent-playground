import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Variant styles for the Button component.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * Size options for the Button component.
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the shared Button component.
 * Extends native button attributes while keeping the public API surface minimal.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content rendered inside the button */
  children: ReactNode;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size variant */
  size?: ButtonSize;
}

/**
 * Shared UI Button component.
 */
export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, variant = 'primary', size = 'md' }) => {
  return (
    <button
        size === 'sm' && 'px-2 py-1 text-sm',
        size === 'md' && 'px-4 py-2',
        size === 'lg' && 'px-6 py-3 text-lg',
        variant === 'primary' && 'bg-blue-600 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-800',
        variant === 'danger' && 'bg-red-500 text-white',
      )}