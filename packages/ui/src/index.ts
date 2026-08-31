export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonVariant = "button";

export type ButtonModel = {
  type: ButtonVariant;
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonModel {
  return {
    type: "button",
    label,
    disabled
  };
}
