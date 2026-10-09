import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

export interface PasswordFieldProps {
  id?: string | null;
  ariaLabel?: string | null;
  ariaDescribedBy?: string | null;
  class?: string;
  autofocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  valid?: boolean;
  invalid?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxlength?: number | null;
  autocomplete?: boolean;
  name?: string | null;
  onClick?: MouseEventHandler<HTMLInputElement> | undefined;
  onInput?: InputEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
}
