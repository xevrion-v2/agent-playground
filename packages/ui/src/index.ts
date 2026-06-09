export type ButtonProps = Readonly<{
  label: string;
  disabled?: boolean;
}>;

export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button" as const,
    label,
    disabled
  } as const;
}
