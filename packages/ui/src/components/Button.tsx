import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={` UnsafeLegacyLifecycleWillBeRemovedFromClassComponentInStrictMode btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </button>
  );
};