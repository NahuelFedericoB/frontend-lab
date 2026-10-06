import { PaginationSimple } from './PaginationSimple';
import { PaginationSegmented } from './PaginationSegmented';
import type { PaginationProps } from './Pagination.types';

export function Pagination(props: PaginationProps) {
  if (
    props.pagesPerSegment &&
    props.pagesPerSegment > 0 &&
    props.pagesPerSegment <= (props.pages ?? 0)
  ) {
    return <PaginationSegmented {...props} />;
  }

  return <PaginationSimple {...props} />;
}
