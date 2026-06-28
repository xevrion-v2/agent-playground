/** Props for the shared Button component */
export type ButtonProps = {
  /** Accessible text displayed inside the button */
  label: string;
  /** When true the button is non-interactive */
  disabled?: boolean;
};

/** Rendered button shape returned by the Button stub */
export interface ButtonRenderResult {
  type: "button";
  label: string;
  disabled: boolean;
}

/**
 * Shared Button stub component.
 *
 * Returns a plain object describing the button — intended as a
 * cross-platform abstraction that framework-specific adapters can
 * render into native elements (DOM, React Native, etc.).
 *
 * @param props — {@link ButtonProps}
 * @returns A {@link ButtonRenderResult} descriptor object
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonRenderResult {
  return {
    type: "button",
    label,
    disabled
  };
}
