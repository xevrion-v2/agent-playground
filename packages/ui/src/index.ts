/** Properties for the Button component. */
export type ButtonProps = {
  /** The text displayed inside the button. */
  label: string;
  /** When true, the button is rendered in a non-interactive state. @default false */
  disabled?: boolean;
};

/** Shape returned by the Button factory. */
export type ButtonReturn = {
  type: "button";
  label: string;
  disabled: boolean;
};

/** Create a button object with the given properties. */
export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled,
  };
}
