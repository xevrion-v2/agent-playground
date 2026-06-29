/**
 * Props for the Button component.
 * @property label - The text displayed on the button
 * @property disabled - Whether the button is interactive (defaults to false)
 */
export type ButtonProps = {
  /** The visible text label rendered on the button */
  label: string;
  /** When true, the button is non-interactive. Defaults to false. */
  disabled?: boolean;
};

/**
 * Shared Button component stub.
 *
 * @param props - Button configuration options
 * @param props.label - The text displayed on the button
 * @param props.disabled - Whether the button is interactive (defaults to false)
 * @returns An object representing the button element with type, label, and disabled state
 *
 * @example
 * ```typescript
 * const btn = Button({ label: "Submit", disabled: false });
 * // { type: "button", label: "Submit", disabled: false }
 * ```
 */
export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}
