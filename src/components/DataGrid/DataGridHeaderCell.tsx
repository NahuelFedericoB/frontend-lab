import { useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';

import noop from '../../utils/noop';
import { Tooltip } from '../Tooltip/Tooltip';

import type { ColumnDrop, ColumnSelection, SortDirection } from './DataGrid.types';
import { useColumnResize } from './useColumnResize';
import { columnDragHandlers } from './columnDragHandlers';

import styles from './DataGridHeaderCell.module.css';

interface DataGridHeaderCellProps {
  id?: string | null;
  hidden?: boolean | undefined;
  sortDirection?: SortDirection;
  onClick?: ((params: ColumnSelection) => void) | null;
  minWidth?: string | null | undefined;
  width?: string | null | undefined;
  maxWidth?: string | null | undefined;
  onDrop?: (params: ColumnDrop) => void;
  sortByColumn?: string | null;
  tooltipText?: string;
  draggable?: boolean;
  resizable?: boolean;
  onResize?: ((headerName: string, newWidth: number) => void) | null;
  children?: ReactNode;
}

export function DataGridHeaderCell({
  id = null,
  hidden = false,
  sortDirection = null,
  onClick = null,
  minWidth = null,
  width = null,
  maxWidth = null,
  onDrop = noop,
  sortByColumn = null,
  tooltipText = 'Drag to reorder columns',
  draggable = true,
  resizable = true,
  onResize = null,
  children,
}: DataGridHeaderCellProps) {
  const [gripIcon, setGripIcon] = useState<HTMLElement | null>(null);
  const { isResizing, handleResizeStart } = useColumnResize(id, resizable, onResize);

  function handleClick(event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) {
    onClick?.({ headerName: event.currentTarget.id, direction: sortDirection });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  }

  return (
    <div
      id={id ?? undefined}
      className={[styles.headerCell, onClick && styles.clickable, hidden && styles.hideCell]
        .filter(Boolean)
        .join(' ')}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-hidden={hidden}
      draggable={draggable && !isResizing}
      onClick={handleClick}
      {...columnDragHandlers(draggable, onDrop)}
      role="gridcell"
      style={{
        width: width ?? undefined,
        minWidth: minWidth ?? undefined,
        maxWidth: maxWidth ?? undefined,
      }}
    >
      <div className={styles.headerCellContent}>
        <div className={styles.headerText}>{children}</div>
        {sortByColumn === id && (
          <i aria-label={`sort icon ${sortDirection}`} className={styles.sortIcon}>
            {sortDirection !== null && (
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d={sortDirection === 'up' ? 'M3 11L8 5l5 6Z' : 'M3 5l5 6 5-6Z'}
                  fill="currentColor"
                />
              </svg>
            )}
          </i>
        )}
        {draggable && (
          <>
            <i ref={setGripIcon} className={styles.gripIcon}>
              <svg viewBox="0 0 12 16" aria-hidden="true" fill="currentColor">
                <circle cx="4" cy="3" r="1.2" />
                <circle cx="8" cy="3" r="1.2" />
                <circle cx="4" cy="8" r="1.2" />
                <circle cx="8" cy="8" r="1.2" />
                <circle cx="4" cy="13" r="1.2" />
                <circle cx="8" cy="13" r="1.2" />
              </svg>
            </i>
            <Tooltip target={gripIcon} placement="top">
              {tooltipText}
            </Tooltip>
          </>
        )}
      </div>
      {resizable && (
        <div
          className={styles.resizeHandle}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize column"
          onMouseDown={handleResizeStart}
        >
          <div className={styles.line} />
        </div>
      )}
    </div>
  );
}
