export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

type ButtonReturn = ButtonProps & { type: "button" };

export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled
  };
}
