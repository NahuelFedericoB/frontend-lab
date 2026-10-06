import type { ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  id?: string | null;
  ariaLabel?: string | null;
  class?: string | null;
  target?: HTMLElement | string | null;
  placement?: TooltipPlacement;
  children?: ReactNode;
  onshow?: () => void;
  onhide?: () => void;
}
