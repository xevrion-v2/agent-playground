export type ButtonVariant = "primary" | "secondary" | "outline";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: ButtonVariant;
};

export function Button({ label, disabled = false, variant = "primary" }: ButtonProps) {
  return { type: "button" as const, label, disabled, variant };
}
