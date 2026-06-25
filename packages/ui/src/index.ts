import React from "react";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Button UI component.
 * Returns a proper JSX element instead of a plain object.
 */
export function Button({ label, disabled = false, onClick }: ButtonProps): React.ReactElement {
  return React.createElement(
    "button",
    { disabled, onClick, type: "button" },
    label
  );
}

export default Button;
