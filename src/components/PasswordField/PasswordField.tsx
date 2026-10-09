import { useState, type KeyboardEvent, type MouseEvent } from 'react';

import type { PasswordFieldProps } from './PasswordField.types';

import styles from './PasswordField.module.css';

export function PasswordField({
  id = null,
  ariaLabel = null,
  ariaDescribedBy = null,
  class: className = '',
  autofocus = false,
  size = 'md',
  valid = false,
  invalid = false,
  value = '',
  placeholder = '',
  disabled = false,
  readOnly = false,
  maxlength = null,
  autocomplete = false,
  name = null,
  onClick,
  onInput,
  onChange,
  onKeyDown,
  onKeyUp,
  onBlur,
}: PasswordFieldProps) {
  const [type, setType] = useState<'password' | 'text'>('password');
  const [input, setInput] = useState({ prop: value, value });

  if (input.prop !== value) {
    setInput({ prop: value, value });
  }

  function togglePasswordVisibility(
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
    skipFocus = false,
  ) {
    const field = event.currentTarget.previousElementSibling as HTMLInputElement;
    setType(type === 'password' ? 'text' : 'password');

    if (!skipFocus) {
      field.focus();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      togglePasswordVisibility(event, true);
    }
  }

  return (
    <div className={styles.passwordFieldContainer}>
      <input
        id={id ?? undefined}
        type={type}
        aria-label={ariaLabel ?? undefined}
        aria-describedby={ariaDescribedBy ?? undefined}
        className={[
          styles.passwordField,
          styles[`size-${size}`],
          valid && styles.valid,
          invalid && styles.invalid,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        autoFocus={autofocus}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxlength ?? undefined}
        autoComplete={autocomplete ? 'on' : 'new-password'}
        name={name ?? undefined}
        value={input.value}
        onClick={onClick}
        onInput={(event) => {
          setInput({ prop: value, value: event.currentTarget.value });
          onInput?.(event);
        }}
        onChange={(event) => {
          setInput({ prop: value, value: event.currentTarget.value });
          onChange?.(event);
        }}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
      />
      <i
        className={styles.icon}
        tabIndex={0}
        role="button"
        aria-label={type === 'password' ? 'Show password' : 'Hide password'}
        onClick={togglePasswordVisibility}
        onKeyDown={handleKeyDown}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
          {type === 'text' && <path d="m3 3 18 18" />}
        </svg>
      </i>
    </div>
  );
}
