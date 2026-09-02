export interface ButtonProps {
  /** Display text rendered inside the button. */
  label: string;
  /** When true, the button is non-interactive. Defaults to false. */
  disabled?: boolean;
}

export interface ButtonOutput {
  /** Always "button" — identifies this object as a button descriptor. */
  readonly type: "button";
  /** The label passed through from props. */
  label: string;
  /** Resolved disabled state (false when omitted). */
  disabled: boolean;
}

/**
 * Creates a plain-object button descriptor.
 *
 * @param props - The button configuration.
 * @returns A serialisable button descriptor object.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonOutput {
  return {
    type: "button",
    label,
    disabled
  };
}
