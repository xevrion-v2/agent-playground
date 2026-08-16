export type ButtonProps = {
  readonly label: string;
  readonly disabled?: boolean;
};

export type ButtonStub = {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
};

/** Shared Button stub used by the web app until real UI primitives land. */
export function Button({ label, disabled = false }: ButtonProps): ButtonStub {
  return {
    type: "button",
    label,
    disabled,
  };
}
