import type { FocusEventHandler, MouseEventHandler, ReactNode } from 'react';

export type ButtonColor = 'primary' | 'light' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'reset' | 'submit';

export interface ButtonProps {
  id?: string | null | undefined;
  ariaLabel?: string | null | undefined;
  color?: ButtonColor;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType | null | undefined;
  className?: string;
  disableFocus?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}
