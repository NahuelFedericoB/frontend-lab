import type { ReactNode } from 'react';

export interface ButtonGroupProps {
  id?: string | null;
  ariaLabel?: string | null;
  vertical?: boolean;
  children?: ReactNode;
}
