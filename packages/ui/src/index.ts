export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/** Runtime model returned by the Button stub (public shape unchanged). */
export type ButtonModel = {
  type: "button";
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonModel {
  return {
    type: "button",
    label,
    disabled,
  };
}
