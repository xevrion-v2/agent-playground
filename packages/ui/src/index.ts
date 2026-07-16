import React from "react";

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  label: React.ReactNode;
};

export function Button({
  label,
  disabled = false,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return React.createElement(
    "button",
    {
      ...buttonProps,
      disabled,
      type
    },
    label
  );
}
