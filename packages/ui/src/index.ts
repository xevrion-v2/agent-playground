import React from 'react';

// FIX #7 (Broken Button Component): Return proper JSX element instead of plain object
export function Button({ label, disabled }: { label: string; disabled?: boolean }) {
  return React.createElement('button', { disabled }, label);
}
