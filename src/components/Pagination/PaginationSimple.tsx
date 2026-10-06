import noop from '../../utils/noop';

import { PaginationBoundary } from './PaginationBoundary';
import { PaginationItem } from './PaginationItem';
import type { PaginationProps } from './Pagination.types';

import styles from './Pagination.module.css';

export function PaginationSimple({
  id = null,
  class: className = null,
  ariaLabel = null,
  size = 'md',
  pages = 1,
  activePage = 1,
  onPageClick = noop,
  onFirstClick = noop,
  onPrevClick = noop,
  onNextClick = noop,
  onLastClick = noop,
}: PaginationProps) {
  const firstPage = 1;
  const lastPage = pages;

  return (
    <ul
      id={id ?? undefined}
      className={[styles.pagination, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel ?? undefined}
    >
      <PaginationBoundary
        size={size}
        position="first"
        isDisabled={activePage === firstPage}
        onClick={onFirstClick}
      />
      <PaginationBoundary
        size={size}
        position="previous"
        isDisabled={activePage === firstPage}
        onClick={onPrevClick}
      />
      {Array.from({ length: pages }, (_, index) => index + 1).map((page) => (
        <PaginationItem
          key={page}
          size={size}
          pageNumber={page}
          isActive={page === activePage}
          onClick={onPageClick}
        />
      ))}
      <PaginationBoundary
        size={size}
        position="next"
        isDisabled={activePage === lastPage}
        onClick={onNextClick}
      />
      <PaginationBoundary
        size={size}
        position="last"
        isDisabled={activePage === lastPage}
        onClick={onLastClick}
      />
    </ul>
  );
}
