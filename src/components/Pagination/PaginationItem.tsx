import noop from '../../utils/noop';
import type { PaginationItemProps } from './Pagination.types';

import styles from './PaginationItem.module.css';

export function PaginationItem({
  size = 'md',
  pageNumber = 1,
  isActive = false,
  isDisabled = false,
  onClick = noop,
}: PaginationItemProps) {
  return (
    <li className={styles.paginationItem}>
      <button
        className={[
          styles.pageButton,
          styles[`size-${size}`],
          isActive && styles.isActive,
          isDisabled && styles.isDisabled,
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={isDisabled}
        onClick={() => onClick(pageNumber)}
      >
        {pageNumber}
      </button>
    </li>
  );
}
