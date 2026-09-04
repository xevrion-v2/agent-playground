import * as React from 'react';

interface ButtonProps {
  /**
   * Button label text
   */
  children: React.ReactNode;
  /**
   * Button click handler
   */
  onClick?: () => void;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export type { ButtonProps };