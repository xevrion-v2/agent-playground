import React from 'react';

export interface ButtonProps {
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  
  /**
   * Button size
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Button content
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Disable button
   */
  disabled?: boolean;
  
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Button type attribute
   */
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'medium', className = '', disabled = false, type = 'button', onClick, ...props }) => {
  return <button type={type} className={className} disabled={disabled} onClick={onClick} {...props}>{children}</button>;
};