import type { TabProps } from './Tab.types';
import styles from './Tab.module.css';

export function Tab({
  id = null,
  className = null,
  ariaLabel = null,
  tabKey = '',
  activeTab = '',
  onSelect = null,
  disabled = false,
  title,
  children,
}: TabProps) {
  const isActive = activeTab === tabKey;
  const classes = [styles.tab, className, isActive && styles.isActive, disabled && styles.disabled]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        id={id}
        aria-label={ariaLabel}
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={-1}
        data-tabkey={tabKey}
        onClick={() => onSelect?.(tabKey)}
        className={classes}
      >
        {title}
      </div>
      {isActive && <div className={styles.tabContent}>{children}</div>}
    </>
  );
}
