export type ButtonProps = {
  readonly label: string;
  readonly disabled?: boolean;
};

type ButtonResult = {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled
  };
}
