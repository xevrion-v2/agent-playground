export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonReturn = {
  type: "button";
  label: string;
  disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return {
    type: "button" as const,
    label,
    disabled
  };
}
