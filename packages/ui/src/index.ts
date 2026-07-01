/** Visual/interaction state for the shared Button stub. */
export type ButtonProps = Readonly<{
  /** Visible button text */
  label: string;
  /** When true, button is non-interactive */
  disabled?: boolean;
}>;

/** Serialized button descriptor returned by the stub renderer. */
export type ButtonElement = Readonly<{
  type: "button";
  label: string;
  disabled: boolean;
}>;

export function Button({ label, disabled = false }: ButtonProps): ButtonElement {
  return {
    type: "button",
    label,
    disabled,
  } satisfies ButtonElement;
}
