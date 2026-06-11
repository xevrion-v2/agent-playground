import type { ButtonHTMLAttributes, ReactElement } from "react";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
};

export function Button({
  label,
  type = "button",
  disabled = false,
  ...props
}: ButtonProps): ReactElement {
  return (
    <button {...props} type={type} disabled={disabled}>
      {label}
    </button>
  );
}
