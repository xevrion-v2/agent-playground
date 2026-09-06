export type ButtonType = "button";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonResult = {
  type: ButtonType;
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled
  };
}
