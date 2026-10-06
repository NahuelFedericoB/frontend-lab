import type { SpinnerProps } from './Spinner.types';

import styles from './Spinner.module.css';

const colorsDict = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  dark: 'dark',
};

export function Spinner({ size = 'md', color = 'primary', children = null }: SpinnerProps) {
  const getColor = () => {
    if (Object.values(colorsDict).includes(color)) {
      return `var(--${color})`;
    }

    return color;
  };

  return (
    <div className={styles.loadingIndicator}>
      <div
        style={{ color: getColor() }}
        className={`${styles.spinner} ${styles[`size-${size}`]}`}
        role="status"
      />
      <div className={`${styles.message} ${styles[`text-${size}`]}`}>{children}</div>
    </div>
  );
}
