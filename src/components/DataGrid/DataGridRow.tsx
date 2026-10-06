import type { KeyboardEvent } from 'react';

import findLastIndex from '../../utils/findLastIndex';

import { DataGridCheckbox } from './DataGridCheckbox';
import { DataGridCell } from './DataGridCell';
import type { DataGridProps, GridRow } from './DataGrid.types';

import styles from './DataGridRow.module.css';

interface DataGridRowProps<T extends GridRow> extends Pick<
  DataGridProps<T>,
  | 'id'
  | 'rowAriaLabel'
  | 'headers'
  | 'onRowClick'
  | 'hideDivisors'
  | 'showCheckbox'
  | 'checkedRows'
  | 'checkboxLeftPosition'
  | 'onCheckboxChange'
> {
  className?: string;
  row?: T;
  active?: boolean;
  hidden?: boolean;
}

export function DataGridRow<T extends GridRow>({
  id = null,
  rowAriaLabel = null,
  className = '',
  headers = [],
  row = {} as T,
  onRowClick = null,
  active = false,
  hidden = false,
  hideDivisors = false,
  showCheckbox = false,
  checkedRows = [],
  checkboxLeftPosition = null,
  onCheckboxChange = null,
}: DataGridRowProps<T>) {
  function handleRowClick() {
    onRowClick?.(row, id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRowClick();
    }
  }

  return (
    <div
      id={id ?? undefined}
      aria-label={rowAriaLabel ?? undefined}
      className={[
        styles.row,
        onRowClick && styles.clickable,
        active && styles.active,
        hidden && styles.hideRow,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden={hidden}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="row"
    >
      {showCheckbox && headers.length > 0 && (
        <DataGridCheckbox
          rowId={id}
          row={row}
          checkedRows={checkedRows}
          leftPosition={checkboxLeftPosition}
          onchange={onCheckboxChange}
        />
      )}
      {headers.map((header, index) => (
        <DataGridCell
          key={`${id}_cell_${index}`}
          {...header}
          id={`${id}_cell_${index}`}
          row={row}
          hideDivisors={hideDivisors}
          isLast={index === findLastIndex(headers, (item) => item.hidden !== true)}
        />
      ))}
    </div>
  );
}
