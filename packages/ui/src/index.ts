export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonViewModel = {
  type: "button";
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonViewModel {
  return {
    type: "button",
    label,
    disabled
  };
}
