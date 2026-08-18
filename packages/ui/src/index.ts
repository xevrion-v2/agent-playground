/** Props accepted by the Button component stub. */
export type ButtonProps = {
  /** Visible label text rendered inside the button. */
  readonly label: string;
  /** When true the button is non-interactive. Defaults to `false`. */
  readonly disabled?: boolean;
};

/** Describes the plain-object shape returned by {@link Button}. */
export type ButtonResult = {
  readonly type: "button";
  readonly label: string;
  readonly disabled: boolean;
};

/**
 * Lightweight Button stub used by the shared UI package.
 *
 * Returns a plain object describing the button rather than rendering JSX,
 * making it easy to test without a DOM.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled
  };
}
