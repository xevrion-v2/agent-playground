export interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export function Button({ label, disabled = false }: ButtonProps): { type: "button"; label: string; disabled: boolean } {
  return {
    type: "button",
    label,
    disabled
  };
}