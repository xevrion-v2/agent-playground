import type { ReactNode, MouseEvent } from 'react';

/** Visual variant of the button */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/** Size preset for the button */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Props for the shared Button component */
export interface ButtonProps {
  /** The button label text */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler — receives the DOM mouse event */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Additional CSS class names */
  className?: string;
  /** Button children (overrides label if provided) */
  children?: ReactNode;
}

/** Return shape of the Button descriptor */
export interface ButtonDescriptor {
  type: 'button';
  label: ReactNode;
  disabled: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Shared Button component stub.
 *
 * Renders a button descriptor object with type metadata for downstream
 * rendering. No runtime DOM elements are created — the returned shape
 * is consumed by a host renderer.
 */
export function Button({
  label,
  disabled = false,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonProps): ButtonDescriptor {
  return {
    type: 'button',
    label: children ?? label,
    disabled,
    onClick,
    variant,
    size,
    className,
  };
}

Button.displayName = 'Button';
