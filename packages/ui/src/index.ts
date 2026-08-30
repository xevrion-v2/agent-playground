/**
 * Props for the shared Button stub component.
 * @public
 */
export interface ButtonProps {
  /** The text label displayed on the button */
  label: string;
  /** Whether the button is in a disabled state (default: false) */
  disabled?: boolean;
}

/**
 * Creates a Button stub object with the given props.
 * This is a pure factory function, not a React/Vue component.
 *
 * @param props - Button configuration
 * @returns A plain object representing the button state
 *
 * @example
 * ```ts
 * const btn = Button({ label: "Submit", disabled: true });
 * // { type: "button", label: "Submit", disabled: true }
 * ```
 */
export function Button({ label, disabled = false }: ButtonProps): {
  type: "button";
  label: string;
  disabled: boolean;
} {
  return {
    type: "button",
    label,
    disabled
  };
}

export { createSequence, Sequences } from "./sequence";
export type { SequenceIterator } from "./sequence";
