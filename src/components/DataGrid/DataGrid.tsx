import { Spinner } from '../Spinner/Spinner';

import { DataGridHeader } from './DataGridHeader';
import { DataGridRow } from './DataGridRow';
import { useGridHeaders } from './useGridHeaders';
import { useGridOverflow } from './useGridOverflow';
import type { DataGridProps, GridRow } from './DataGrid.types';

import styles from './DataGrid.module.css';

const emptyHeaders: never[] = [];

export function DataGrid<T extends GridRow = GridRow>({
  id = null,
  ariaLabel = null,
  rowAriaLabel = null,
  headers: suppliedHeaders = emptyHeaders,
  rows = [],
  onColumnClick = null,
  onRowClick = null,
  rowClassName = ' ',
  activeRow = null,
  sortDirection = null,
  sortByColumn = null,
  loading = false,
  loadingMessage = 'Loading...',
  noDataMessage = 'No data is available',
  stickyHeader = false,
  class: className = '',
  hideDivisors = false,
  gridOverflow = false,
  draggable = true,
  resizable = true,
  showCheckbox = false,
  checkedRows = [],
  checkboxLeftPosition = null,
  onCheckboxChange = null,
}: DataGridProps<T>) {
  const { headers, handleColumnResize, reorganizeHeaders } = useGridHeaders(suppliedHeaders);
  const { gridRef, messageRef } = useGridOverflow(gridOverflow, loading);
  const emptyMessage =
    typeof noDataMessage === 'string' ? (
      <div className={styles.noDataMessage}>{noDataMessage}</div>
    ) : (
      noDataMessage
    );

  return (
    <div
      ref={gridRef}
      id={id ?? undefined}
      aria-label={ariaLabel ?? undefined}
      className={[
        styles.dataGrid,
        (loading || !rows.length) && styles.fullHeight,
        gridOverflow && styles.gridOverflow,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <DataGridHeader
        headers={headers}
        onClick={onColumnClick}
        onDrop={reorganizeHeaders}
        onResize={handleColumnResize}
        sortDirection={sortDirection}
        sortByColumn={sortByColumn}
        stickyHeader={stickyHeader}
        draggable={draggable}
        resizable={resizable}
        showCheckbox={showCheckbox}
        checkboxLeftPosition={checkboxLeftPosition}
        rows={rows}
        onCheckboxChange={onCheckboxChange}
        checkedRows={checkedRows}
      />
      {loading ? (
        <div ref={messageRef} className={styles.loadingIndicator}>
          <Spinner>{loadingMessage}</Spinner>
        </div>
      ) : !rows.length || rows.every((row) => row.hidden) ? (
        gridOverflow ? (
          <div ref={messageRef}>{emptyMessage}</div>
        ) : (
          emptyMessage
        )
      ) : (
        rows.map((row, index) => {
          const rowId = `row_${index}`;
          return (
            <DataGridRow
              key={rowId}
              id={rowId}
              active={activeRow === rowId}
              rowAriaLabel={rowAriaLabel}
              row={row}
              checkedRows={checkedRows}
              headers={headers}
              onRowClick={onRowClick}
              hideDivisors={hideDivisors}
              showCheckbox={showCheckbox}
              checkboxLeftPosition={checkboxLeftPosition}
              onCheckboxChange={onCheckboxChange}
              className={rowClassName}
              hidden={!!row.hidden}
            />
          );
        })
      )}
    </div>
  );
}
