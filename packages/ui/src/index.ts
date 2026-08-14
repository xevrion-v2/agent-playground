export type ButtonProps = {
  readonly label: string;
  readonly disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): { readonly type: string; readonly label: string; readonly disabled: boolean } {
  return {
    type: "button",
    label,
    disabled
  };
}
