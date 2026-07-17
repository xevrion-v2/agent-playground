/** Props for the {@link Button} component. */
export type ButtonProps = {
  /** Visible text rendered on the button. */
  label: string;
  /** When true the button is non-interactive. Defaults to false. */
  disabled?: boolean;
};

/** Serializable description of a rendered button (not a DOM/node element). */
export type ButtonElement = {
  type: "button";
  label: string;
  disabled: boolean;
};

/**
 * Create a Button description.
 *
 * Returns a plain, serializable object describing the button rather than a
 * DOM/node element, so it can be rendered or transmitted without a runtime.
 *
 * @param props - The button's label and optional disabled flag.
 * @returns A {@link ButtonElement} describing the button.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonElement {
  return {
    type: "button",
    label,
    disabled
  };
}
