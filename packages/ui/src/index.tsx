import React, {
  type ButtonHTMLAttributes,
  type ReactElement
} from "react";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  label: string;
};

export function Button({
  label,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps): ReactElement {
  return (
    <button {...props} disabled={disabled} type={type}>
      {label}
    </button>
  );
}
