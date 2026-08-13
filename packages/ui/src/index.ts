export type ButtonProps = {
  /** The text displayed inside the button. */
  label: string;
  /** Whether the button is disabled. Defaults to false. */
  disabled?: boolean;
};

/** The object returned by the Button component. */
export type ButtonResult = {
  type: "button";
  label: string;
  disabled: boolean;
};

/**
 * Creates a button object with the given label and disabled state.
 *
 * @param props - Button configuration.
 * @returns A {@link ButtonResult} describing the button.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled
  };
}
