import { createElement, type ButtonHTMLAttributes, type ReactElement } from "react";

export type ButtonProps = {
  label: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({
  label,
  disabled = false,
  type = "button",
  ...buttonProps
}: ButtonProps): ReactElement {
  return createElement(
    "button",
    {
      ...buttonProps,
      disabled,
      type
    },
    label
  );
}
