import { useLayoutEffect, useRef, useState } from 'react';

import type { CheckboxProps } from './Checkbox.types';

import styles from './Checkbox.module.css';

export function Checkbox({
  id = null,
  ariaLabel = null,
  ariaDescribedBy = null,
  ariaLabelledBy = null,
  class: className = '',
  value = null,
  size = 'md',
  valid = false,
  invalid = false,
  checked = false,
  indeterminate = false,
  disabled = false,
  name = null,
  tabindex = null,
  onChange,
  onBlur,
  onFocusOut,
  ...events
}: CheckboxProps) {
  const input = useRef<HTMLInputElement>(null);
  const [selection, setSelection] = useState({ prop: checked, value: checked });

  if (selection.prop !== checked) {
    setSelection({ prop: checked, value: checked });
  }

  useLayoutEffect(() => {
    if (input.current) {
      input.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      {...events}
      ref={input}
      type="checkbox"
      id={id ?? undefined}
      aria-label={ariaLabel ?? undefined}
      aria-describedby={ariaDescribedBy ?? undefined}
      aria-labelledby={ariaLabelledBy ?? undefined}
      aria-checked={indeterminate ? 'mixed' : selection.value}
      className={[
        styles.checkbox,
        styles[`size-${size}`],
        valid && styles.valid,
        invalid && styles.invalid,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      name={name ?? undefined}
      tabIndex={tabindex ?? undefined}
      value={value ?? undefined}
      checked={selection.value}
      onChange={(event) => {
        setSelection({ prop: checked, value: event.currentTarget.checked });
        onChange?.(event);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        onFocusOut?.(event);
      }}
    />
  );
}
