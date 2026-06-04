export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonResult = {
  type: "button";
  label: string;
  disabled: boolean;
};

/**
 * Renders a Button stub with the given properties.
 * 
 * @param props The properties for the Button stub.
 * @returns The Button stub object.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled
  };
}

