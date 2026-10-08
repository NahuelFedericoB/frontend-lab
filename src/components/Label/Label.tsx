import type { LabelProps } from './Label.types';

import styles from './Label.module.css';

export function Label({
  id = null,
  ariaLabel = null,
  check = false,
  disabled = false,
  required = false,
  size = 'md',
  class: className = '',
  for: htmlFor,
  children,
}: LabelProps) {
  return (
    <label
      id={id ?? undefined}
      aria-label={ariaLabel ?? undefined}
      htmlFor={htmlFor}
      className={[
        styles.label,
        styles[`size-${size}`],
        check && styles.check,
        required && styles.required,
        disabled && styles.disabled,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </label>
  );
}
