import handleKeyDown from '../../utils/handleKeyDown';

import type { ButtonProps } from './Button.types';

import styles from './Button.module.css';

export function Button({
  id = null,
  ariaLabel = null,
  color = 'primary',
  disabled = false,
  size = 'md',
  type = 'button',
  className = '',
  disableFocus = false,
  children,
  onClick,
  onBlur,
  onMouseLeave,
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[color],
    styles[`size-${size}`],
    disabled && styles.disabled,
    disableFocus && styles.noPointerEvents,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      id={id ?? undefined}
      disabled={disabled}
      type={type ?? undefined}
      tabIndex={disableFocus ? -1 : undefined}
      aria-label={ariaLabel ?? undefined}
      className={classes}
      onClick={onClick}
      onBlur={onBlur}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
}
