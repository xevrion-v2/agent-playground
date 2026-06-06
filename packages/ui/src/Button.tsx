import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visual style variant of the button */
  variant?: "primary" | "secondary" | "danger";
  /** The size of the button */
  size?: "sm" | "md" | "lg";
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Optional icon to display before the button text */
  leftIcon?: React.ReactNode;
  /** Optional icon to display after the button text */
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, leftIcon, rightIcon, children, ...rest }, ref) => {
    return <button ref={ref} {...rest}>{children}</button>;
  }
);

Button.displayName = "Button";