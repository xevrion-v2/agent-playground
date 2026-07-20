export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonResult = {
  type: "button";
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled,
  };
}
