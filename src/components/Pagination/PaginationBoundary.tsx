import noop from '../../utils/noop';
import type { PaginationBoundaryProps, PaginationPosition } from './Pagination.types';

import styles from './PaginationBoundary.module.css';

const symbols: Record<PaginationPosition, string> = {
  first: '«',
  next: '›',
  previous: '‹',
  last: '»',
};

export function PaginationBoundary({
  size = 'md',
  position = 'first',
  isActive = false,
  isDisabled = false,
  onClick = noop,
}: PaginationBoundaryProps) {
  return (
    <li className={styles.paginationItem}>
      <button
        className={[
          styles.pageButton,
          styles[`size-${size}`],
          isActive && styles.isActive,
          isDisabled && styles.isDisabled,
          position === 'first' && styles.roundedLeft,
          position === 'last' && styles.roundedRight,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={isDisabled}
        onClick={onClick}
      >
        <span aria-hidden="true" className={styles[`symbols-${size}`]}>
          {symbols[position]}
        </span>
        <span className={styles.accessibleLabel}>{position}</span>
      </button>
    </li>
  );
}
