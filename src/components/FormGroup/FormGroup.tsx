import type { FormGroupProps } from './FormGroup.types';

import styles from './FormGroup.module.css';

export function FormGroup({
  id = null,
  class: className = null,
  ariaLabel = null,
  check = false,
  inline = false,
  hint = '',
  hintId = null,
  hintColor = '',
  error = '',
  children,
}: FormGroupProps) {
  return (
    <fieldset
      id={id ?? undefined}
      aria-label={ariaLabel ?? undefined}
      className={[
        styles.formGroup,
        className,
        inline && styles.inline,
        check && styles.check,
        error && styles.error,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
      <span
        id={hintId ?? undefined}
        className={[styles.hint, styles[`hintcolor-${hintColor}`], error && styles.error]
          .filter(Boolean)
          .join(' ')}
      >
        {error || hint}
      </span>
    </fieldset>
  );
}
