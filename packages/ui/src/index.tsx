/**
 * Props for the Button component.
 */
export type ButtonProps = {
  /** The text label displayed inside the button. */
  label: string;
  /** Whether the button is disabled. Defaults to false. */
  disabled?: boolean;
};

/**
 * A simple Button component for the TaskFlow UI.
 *
 * @param props - The button props.
 * @returns A rendered button element.
 */
export function Button({ label, disabled = false }: ButtonProps) {
  return <button disabled={disabled}>{label}</button>;
}
