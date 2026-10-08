import type { ReactNode } from 'react';

export interface LabelProps {
  id?: string | null;
  ariaLabel?: string | null;
  check?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  for?: string;
  children?: ReactNode;
}
