export type ButtonProps = {
  readonly label: string;
  readonly disabled?: boolean;
};

export type ButtonType = "button";

export type ButtonResult = {
  readonly type: ButtonType;
  readonly label: string;
  readonly disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled
  };
}
