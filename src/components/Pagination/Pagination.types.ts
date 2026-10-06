export type PaginationSize = 'sm' | 'md' | 'lg';
export type PaginationPosition = 'first' | 'previous' | 'next' | 'last';

export interface PaginationProps {
  id?: string | null;
  class?: string | null;
  ariaLabel?: string | null;
  size?: PaginationSize;
  pages?: number;
  pagesPerSegment?: number | undefined;
  activePage?: number;
  onPageClick?: (pageNumber: number) => void;
  onFirstClick?: () => void;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  onLastClick?: () => void;
}

export interface PaginationItemProps {
  size?: PaginationSize;
  pageNumber?: number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (pageNumber: number) => void;
}

export interface PaginationBoundaryProps {
  size?: PaginationSize;
  position?: PaginationPosition;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export interface PaginationEllipsisProps {
  size?: PaginationSize;
  isVisible?: boolean;
}
