import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

export interface TextFieldProps {
  id?: string | null;
  type?: string | null;
  class?: string | null;
  ariaLabel?: string | null;
  ariaDescribedBy?: string | null;
  ariaLabelledBy?: string | null;
  autofocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  valid?: boolean;
  invalid?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number | null;
  autocomplete?: boolean;
  name?: string | null;
  list?: string | null;
  tabindex?: number | null;
  onclick?: MouseEventHandler<HTMLInputElement> | null;
  oninput?: InputEventHandler<HTMLInputElement> | null;
  onchange?: ChangeEventHandler<HTMLInputElement> | null;
  onkeydown?: KeyboardEventHandler<HTMLInputElement> | null;
  onkeyup?: KeyboardEventHandler<HTMLInputElement> | null;
  onfocus?: FocusEventHandler<HTMLInputElement> | null;
  onblur?: FocusEventHandler<HTMLInputElement> | null;
  onfocusout?: FocusEventHandler<HTMLInputElement> | null;
  onmouseenter?: MouseEventHandler<HTMLInputElement> | null;
  onmouseleave?: MouseEventHandler<HTMLInputElement> | null;
}
