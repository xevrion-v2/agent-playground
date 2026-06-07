export type ButtonProps = {
  readonly label: string;
  readonly disabled?: boolean;
};

export type ButtonViewModel = {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
};

export function Button({
  label,
  disabled = false
}: ButtonProps): ButtonViewModel {
  return {
    type: "button",
    label,
    disabled
  };
}
