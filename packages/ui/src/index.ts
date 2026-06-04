/**
 * Props for the shared Button component.
 */
export interface ButtonProps {
  /** The text displayed inside the button. */
  label: string;
  /** When true, the button is non-interactive and visually dimmed. */
  disabled?: boolean;
}

/**
 * Renders a UI button descriptor.
 *
 * @param props - The button configuration.
 * @returns An object describing the button for the rendering layer.
 *
 * @example
 * ```tsx
 * <Button label="Submit" disabled={false} />
 * ```
 */
export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button" as const,
    label,
    disabled
  };
}
