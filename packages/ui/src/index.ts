export type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export type ButtonReturn = {
  type: "button";
  label: string;
  disabled: boolean;
  variant: ButtonProps["variant"];
  size: ButtonProps["size"];
};

export function Button({ label, disabled = false, variant = "primary", size = "md" }: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size
  };
}
