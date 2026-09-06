export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/** The shape returned by {@link Button}. */
export type ButtonReturn = {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled,
  } as const;
}
