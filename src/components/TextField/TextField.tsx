import { useState } from 'react';

import type { TextFieldProps } from './TextField.types';

import styles from './TextField.module.css';

export function TextField({
  id = null,
  type = 'text',
  class: className = null,
  ariaLabel = null,
  ariaDescribedBy = null,
  ariaLabelledBy = null,
  autofocus = false,
  size = 'md',
  valid = false,
  invalid = false,
  value = '',
  placeholder = '',
  disabled = false,
  readonly = false,
  maxlength = null,
  autocomplete = false,
  name = null,
  list = null,
  tabindex = null,
  onclick,
  oninput,
  onchange,
  onkeydown,
  onkeyup,
  onfocus,
  onblur,
  onfocusout,
  onmouseenter,
  onmouseleave,
}: TextFieldProps) {
  const [input, setInput] = useState({ prop: value, value });

  if (input.prop !== value) {
    setInput({ prop: value, value });
  }

  return (
    <input
      id={id ?? undefined}
      type={type ?? undefined}
      aria-label={ariaLabel ?? undefined}
      aria-describedby={ariaDescribedBy ?? undefined}
      aria-labelledby={ariaLabelledBy ?? undefined}
      aria-readonly={readonly}
      className={[
        styles.textField,
        styles[`size-${size}`],
        valid && styles.valid,
        invalid && styles.invalid,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      autoComplete={autocomplete ? 'on' : 'off'}
      autoFocus={autofocus}
      value={input.value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      maxLength={maxlength ?? undefined}
      name={name ?? undefined}
      list={list ?? undefined}
      tabIndex={tabindex ?? undefined}
      onClick={onclick ?? undefined}
      onInput={(event) => {
        setInput({ prop: value, value: event.currentTarget.value });
        oninput?.(event);
      }}
      onChange={(event) => {
        setInput({ prop: value, value: event.currentTarget.value });
        onchange?.(event);
      }}
      onKeyDown={onkeydown ?? undefined}
      onKeyUp={onkeyup ?? undefined}
      onFocus={onfocus ?? undefined}
      onBlur={(event) => {
        onblur?.(event);
        onfocusout?.(event);
      }}
      onMouseEnter={onmouseenter ?? undefined}
      onMouseLeave={onmouseleave ?? undefined}
    />
  );
}
