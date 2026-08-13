export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonStub = {
  type: "button";
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonStub {
  return {
    type: "button",
    label,
    disabled
  };
}
