import noop from '../../utils/noop';

import { DataGridHeaderCell } from './DataGridHeaderCell';
import { DataGridCheckbox } from './DataGridCheckbox';
import type { ColumnDrop, ColumnSelection, DataGridProps, GridRow } from './DataGrid.types';

import styles from './DataGridHeader.module.css';

interface DataGridHeaderProps<T extends GridRow> extends Pick<
  DataGridProps<T>,
  | 'id'
  | 'headers'
  | 'rows'
  | 'sortByColumn'
  | 'sortDirection'
  | 'stickyHeader'
  | 'draggable'
  | 'resizable'
  | 'showCheckbox'
  | 'onCheckboxChange'
  | 'checkedRows'
  | 'checkboxLeftPosition'
> {
  onClick?: ((params: ColumnSelection) => void) | null;
  onDrop?: (params: ColumnDrop) => void;
  onResize?: ((headerName: string, newWidth: number) => void) | null;
}

export function DataGridHeader<T extends GridRow>({
  id = null,
  headers = [],
  rows = [],
  onClick = null,
  sortByColumn = null,
  sortDirection = null,
  stickyHeader = false,
  draggable = true,
  resizable = true,
  onResize = null,
  onDrop = noop,
  showCheckbox = false,
  onCheckboxChange = null,
  checkedRows = [],
  checkboxLeftPosition = null,
}: DataGridHeaderProps<T>) {
  function isIndeterminate() {
    const rowCount = rows.filter((row) => !row.hidden).length;
    const areAllChecked =
      checkedRows.length === rowCount && checkedRows.every((row) => row.__checked === true);
    const areAllUnchecked =
      checkedRows.length === rowCount && checkedRows.every((row) => !row.__checked);
    if (areAllChecked || areAllUnchecked) return false;
    if (checkedRows.some((row) => row.__checked)) return true;
  }

  return (
    <div
      id={id ?? undefined}
      className={[styles.header, stickyHeader && styles.stickyHeader].filter(Boolean).join(' ')}
    >
      {showCheckbox && (
        <DataGridCheckbox
          rowId="headerCheckbox"
          rows={rows}
          checkedRows={checkedRows}
          leftPosition={checkboxLeftPosition}
          indeterminate={isIndeterminate()}
          onchange={onCheckboxChange}
        />
      )}
      {headers.map((header) => (
        <DataGridHeaderCell
          key={header.header}
          id={header.header}
          onClick={onClick}
          sortByColumn={sortByColumn}
          sortDirection={sortDirection}
          onDrop={onDrop}
          draggable={draggable}
          resizable={resizable}
          onResize={onResize}
          hidden={header.hidden}
          minWidth={header.minWidth}
          width={header.width}
          maxWidth={header.maxWidth}
        >
          {header.label}
        </DataGridHeaderCell>
      ))}
    </div>
  );
}
