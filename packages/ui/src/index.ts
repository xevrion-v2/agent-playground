import type { JSX } from "react";

export type ButtonProps = {
  /** The text label displayed on the button */
  label: string;
  /** Whether the button is disabled (default: false) */
  disabled?: boolean;
};

export type ButtonReturn = JSX.Element;

/**
 * A simple button component
 *
 * @param props - Button properties including label and disabled state
 * @returns A JSX button element
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return (
    <button type="button" disabled={disabled}>
      {label}
    </button>
  );
}
