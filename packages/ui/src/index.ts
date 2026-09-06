import { createElement, type ReactElement } from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps): ReactElement {
  return createElement(
    "button",
    {
      type: "button",
      disabled,
    },
    label,
  );
}
