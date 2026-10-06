import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

export interface CheckboxProps {
  id?: string | null;
  ariaLabel?: string | null;
  ariaDescribedBy?: string | null;
  ariaLabelledBy?: string | null;
  class?: string;
  value?: string | null;
  size?: 'sm' | 'md' | 'lg';
  valid?: boolean;
  invalid?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  name?: string | null;
  tabindex?: number | null;
  onClick?: MouseEventHandler<HTMLInputElement> | undefined;
  onInput?: InputEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  onFocusOut?: FocusEventHandler<HTMLInputElement> | undefined;
  onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
}
