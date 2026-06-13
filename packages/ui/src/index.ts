export type ButtonProps = {
  /** The text label displayed on the button */
  label: string;
  /** Whether the button is disabled (default: false) */
  disabled?: boolean;
};

/** The return type of the Button component */
export type ButtonReturn = {
  /** The HTML button type attribute */
  type: "button";
  /** The text label displayed on the button */
  label: string;
  /** Whether the button is disabled */
  disabled: boolean;
};

/**
 * A simple button component stub
 * 
 * @param props - Button properties including label and disabled state
 * @returns An object representing the button configuration
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled
  };
}
