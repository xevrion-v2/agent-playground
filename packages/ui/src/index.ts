import type { JSX } from "react";

export type ButtonProps = {
  /** The text label displayed on the button */
  label: string;
  /** Whether the button is disabled (default: false) */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Button click handler */
  onClick?: () => void;
};

export type ButtonReturn = JSX.Element;

/**
 * A simple button component
 *
 * @param props - Button properties including label and disabled state
 * @returns A JSX button element
 */
export function Button({ label, disabled = false, className, onClick }: ButtonProps): JSX.Element {
  return (
    <button type="button" disabled={disabled} className={className} onClick={onClick}>
      {label}
    </button>
  );
}
