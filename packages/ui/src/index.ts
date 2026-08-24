export interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export interface ButtonElement {
  type: "button";
  label: string;
  disabled: boolean;
}

export function Button({ label, disabled = false }: ButtonProps): ButtonElement {
  // Closes #3
  return {
    type: "button",
    label,
    disabled
  };
}
