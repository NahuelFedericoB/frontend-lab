import noop from '../../utils/noop';
import chunk from '../../utils/chunk';

import { PaginationBoundary } from './PaginationBoundary';
import { PaginationItem } from './PaginationItem';
import { PaginationEllipsis } from './PaginationEllipsis';
import type { PaginationProps } from './Pagination.types';

import styles from './Pagination.module.css';

function getActivePageRangePosition(activePage: number, lastPage: number, range: number[][]) {
  if (activePage === lastPage) {
    return range.length - 1;
  }

  const position = range.findIndex((segment) => segment.includes(activePage));
  return position !== -1 ? position : 0;
}

export function PaginationSegmented({
  id = null,
  class: className = null,
  ariaLabel = null,
  size = 'md',
  pages = 1,
  pagesPerSegment = 1,
  activePage = 1,
  onPageClick = noop,
  onFirstClick = noop,
  onPrevClick = noop,
  onNextClick = noop,
  onLastClick = noop,
}: PaginationProps) {
  const firstPage = 1;
  const lastPage = pages;
  const range = chunk(
    Array.from({ length: pages }, (_, index) => index + 1),
    pagesPerSegment,
  );
  const activePagePosition = getActivePageRangePosition(activePage, lastPage, range);

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
      {activePagePosition !== 0 && (
        <PaginationItem size={size} pageNumber={firstPage} onClick={onPageClick} />
      )}
      <PaginationEllipsis size={size} isVisible={activePagePosition !== 0} />
      {range[activePagePosition]?.map((page) => (
        <PaginationItem
          key={page}
          size={size}
          pageNumber={page}
          isActive={page === activePage}
          onClick={onPageClick}
        />
      ))}
      <PaginationEllipsis size={size} isVisible={activePagePosition !== range.length - 1} />
      {activePagePosition !== range.length - 1 && (
        <PaginationItem size={size} pageNumber={lastPage} onClick={onPageClick} />
      )}
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
