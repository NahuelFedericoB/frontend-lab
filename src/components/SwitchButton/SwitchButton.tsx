import noop from '../../utils/noop';
import handleKeyDown from '../../utils/handleKeyDown';

import type { SwitchButtonProps } from './SwitchButton.types';

import styles from './SwitchButton.module.css';

export function SwitchButton({
  id = null,
  class: className = null,
  ariaLabel = null,
  ariaDescribedBy = null,
  leftLabel = 'left',
  rightLabel = 'right',
  size = 'md',
  activeSide = 'left',
  disabled = false,
  onclick = noop,
}: SwitchButtonProps) {
  const isLeftActive = activeSide === 'left';
  const isRightActive = activeSide === 'right';
  const isLeftDisabled = isLeftActive && disabled;
  const isRightDisabled = !isLeftActive && disabled;

  return (
    <div
      id={id ?? undefined}
      onClick={onclick}
      role="button"
      aria-label={ariaLabel ?? undefined}
      aria-describedby={ariaDescribedBy ?? undefined}
      className={[
        styles.switchButton,
        styles[`size-${size}`],
        className,
        disabled && styles.disabled,
      ]
        .filter(Boolean)
        .join(' ')}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
    >
      <div
        className={[
          styles.foreground,
          isLeftActive && styles.switchLeft,
          isRightActive && styles.switchRight,
          isLeftDisabled && styles.disabledLeft,
          isRightDisabled && styles.disabledRight,
          disabled && styles.disabled,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <span
        className={[styles.leftSide, isLeftActive && styles.activeFont, disabled && styles.disabled]
          .filter(Boolean)
          .join(' ')}
      >
        {leftLabel}
      </span>
      <span
        className={[
          styles.rightSide,
          isRightActive && styles.activeFont,
          disabled && styles.disabled,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {rightLabel}
      </span>
    </div>
  );
}
