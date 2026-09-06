import React from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ label, disabled = false, onClick }: ButtonProps): React.ReactElement {
  return React.createElement(
    "button",
    {
      type: "button",
      disabled,
      onClick,
      className: "tf-button",
      "aria-disabled": disabled,
    },
    label
  );
}
