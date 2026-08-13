/**
 * Props for the Button component stub.
 */
export type ButtonProps = {
  /** Text content displayed on the button */
  label: string;
  /** When true, button is non-interactive and visually dimmed */
  disabled?: boolean;
};

/**
 * Return type for the Button stub function.
 * Represents a serializable button object for testing or SSR scenarios.
 */
export type ButtonReturn = {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
};

/**
 * Button component stub for the shared UI package.
 * Returns a plain object representation rather than rendering DOM.
 *
 * @param props - Button configuration
 * @returns Serializable button object
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled
  };
}
