import handleKeyDown from '../../utils/handleKeyDown';

import type { ButtonGroupTileProps } from './ButtonGroupTile.types';

import styles from './ButtonGroupTile.module.css';

export function ButtonGroupTile({
  id = null,
  ariaLabel = null,
  vertical = false,
  size = 'md',
  disabled = false,
  active = false,
  children,
  onClick,
}: ButtonGroupTileProps) {
  return (
    <div
      id={id ?? undefined}
      aria-label={ariaLabel ?? undefined}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={[
        styles.buttonGroupTile,
        styles[`size-${size}`],
        vertical && styles.vertical,
        disabled && styles.disabled,
        active && styles.active,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
