import type { ReactNode } from 'react';

export interface FormGroupProps {
  id?: string | null;
  class?: string | null;
  ariaLabel?: string | null;
  check?: boolean;
  inline?: boolean;
  hint?: string;
  hintId?: string | null;
  hintColor?: string;
  error?: string;
  children?: ReactNode;
}
