/**
 * Props for the shared Button component.
 */
export interface ButtonProps {
  /** The visible text displayed on the button. */
  label: string;
  /** When true, the button appears as non-interactive and cannot be clicked. */
  disabled?: boolean;
}

/**
 * A minimal shared Button component factory.
 *
 * Returns a plain object representing a button, intended for
 * use or rendering within the TaskFlow UI package.
 *
 * @param props - {@link ButtonProps}
 * @returns A button descriptor object with `type`, `label`, and `disabled` fields.
 *
 * @example
 * ```ts
 * const btn = Button({ label: "Submit", disabled: false });
 * // => { type: "button", label: "Submit", disabled: false }
 * ```
 */
export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button" as const,
    label,
    disabled,
  };
}
