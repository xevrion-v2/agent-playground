type ButtonOutput = {
  type: "button";
  label: string;
  disabled: boolean;
};

export type ButtonProps = {
  readonly label: string;
  readonly disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonOutput {
  return {
    type: "button",
    label,
    disabled
  };
}
