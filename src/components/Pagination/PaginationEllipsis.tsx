import type { PaginationEllipsisProps } from './Pagination.types';

import styles from './PaginationEllipsis.module.css';

export function PaginationEllipsis({ size = 'md', isVisible = false }: PaginationEllipsisProps) {
  return (
    <li
      className={[styles.paginationItem, isVisible && styles.isVisible].filter(Boolean).join(' ')}
    >
      <button className={`${styles.pageButton} ${styles[`size-${size}`]}`} disabled>
        ...
      </button>
    </li>
  );
}
