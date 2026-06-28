/** Props for the shared Button component. */
export type ButtonProps = {
  /** Visible text rendered inside the button. */
  label: string;
  /** When true, the button is non-interactive. @default false */
  disabled?: boolean;
};

/** Renders a button descriptor object. */
export function Button(
  { label, disabled = false }: Readonly<ButtonProps>
): Readonly<{ type: "button"; label: string; disabled: boolean }> {
  return {
    type: "button" as const,
    label,
    disabled
  };
}
