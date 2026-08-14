/** Shared UI Button stub props — keep this surface stable for callers. */
export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/** Runtime object returned by Button; matches the public stub shape. */
export type ButtonElement = {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
};

export function Button({
  label,
  disabled = false,
}: ButtonProps): ButtonElement {
  return {
    type: "button",
    label,
    disabled,
  };
}
