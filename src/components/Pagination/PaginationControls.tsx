import type { PaginationSize } from './Pagination.types';

import styles from './PaginationControls.module.css';

export interface PaginationDemoOptions {
  size: PaginationSize;
  pages: number;
  pagesPerSegment: number;
}

interface PaginationControlsProps {
  options: PaginationDemoOptions;
  onChange: (options: PaginationDemoOptions) => void;
}

export function PaginationControls({ options, onChange }: PaginationControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.field}>
        <span>Size</span>
        <select
          value={options.size}
          onChange={(event) => onChange({ ...options, size: event.target.value as PaginationSize })}
        >
          <option value="sm">SM</option>
          <option value="md">MD</option>
          <option value="lg">LG</option>
        </select>
      </label>
      <label className={styles.field}>
        <span>Pages</span>
        <select
          value={options.pages}
          onChange={(event) => onChange({ ...options, pages: Number(event.target.value) })}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
      <label className={styles.field}>
        <span>Pages per segment</span>
        <select
          value={options.pagesPerSegment}
          onChange={(event) =>
            onChange({ ...options, pagesPerSegment: Number(event.target.value) })
          }
        >
          <option value={0}>All pages</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
        </select>
      </label>
    </div>
  );
}
