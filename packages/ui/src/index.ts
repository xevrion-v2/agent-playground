export type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export type ButtonReturn = {
  type: string;
  label: string;
  disabled: boolean;
  onClick?: () => void;
  variant: "primary" | "secondary" | "ghost";
  size: "sm" | "md" | "lg";
};

export function Button({
  label,
  disabled = false,
  onClick,
  variant = "primary",
  size = "md"
}: ButtonProps): ButtonReturn {
  return {
    type: "button",
    label,
    disabled,
    onClick,
    variant,
    size
  };
}
