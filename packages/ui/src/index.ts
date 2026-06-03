export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonElement = {
  type: "button";
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonElement {
  return {
    type: "button",
    label,
    disabled
  };
}
