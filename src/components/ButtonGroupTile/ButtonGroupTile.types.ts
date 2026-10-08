import type { MouseEventHandler, ReactNode } from 'react';

export interface ButtonGroupTileProps {
  id?: string | null;
  ariaLabel?: string | null;
  vertical?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  active?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
