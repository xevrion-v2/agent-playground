/** Props for the shared Button component. */
export type ButtonProps = {
  /** The text label displayed on the button. */
  label: string;
  /** Whether the button is disabled. Defaults to false. */
  disabled?: boolean;
};

/**
 * Creates a Button configuration object.
 * @param label - The text label displayed on the button.
 * @param disabled - Whether the button is disabled.
 * @returns A ButtonProps-compatible object with a type discriminator.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonProps & { type: string } {
  return {
    type: "button",
    label,
    disabled
  };
}
