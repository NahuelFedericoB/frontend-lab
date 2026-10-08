import type { ButtonGroupProps } from './ButtonGroup.types';

import styles from './ButtonGroup.module.css';

export function ButtonGroup({
  id = null,
  ariaLabel = null,
  vertical = false,
  children,
}: ButtonGroupProps) {
  return (
    <div
      id={id ?? undefined}
      aria-label={ariaLabel ?? undefined}
      className={[styles.buttonGroup, vertical && styles.vertical].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
