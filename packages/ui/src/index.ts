/**
 * Props for the shared Button component.
 */
export type ButtonProps = {
  /** The visible text inside the button. */
  label: string;
  /** When true, the button is non-interactive. Defaults to false. */
  disabled?: boolean;
  /** Visual style variant. */
  variant?: "primary" | "secondary" | "danger";
  /** Accessible name for screen readers (defaults to label). */
  ariaLabel?: string;
};

/**
 * Render props returned by the Button factory for framework-agnostic use.
 */
export type ButtonRender = {
  type: "button";
  label: string;
  disabled: boolean;
  variant: "primary" | "secondary" | "danger";
  ariaLabel: string;
};

/**
 * Create a framework-agnostic button render object.
 *
 * @param props - {@link ButtonProps}
 * @returns A {@link ButtonRender} object ready for framework-specific rendering.
 *
 * @example
 * const btn = Button({ label: "Save", variant: "primary" });
 * // btn => { type: "button", label: "Save", disabled: false, variant: "primary", ariaLabel: "Save" }
 */
export function Button({ label, disabled = false, variant = "primary", ariaLabel }: ButtonProps): ButtonRender {
  return {
    type: "button",
    label,
    disabled,
    variant,
    ariaLabel: ariaLabel ?? label
  };
}
