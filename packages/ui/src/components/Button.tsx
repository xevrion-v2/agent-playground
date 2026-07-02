import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, variant = 'primary', ...rest }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn btn-${variant}`} {...rest}>
      {children}
    </button>
  );
};