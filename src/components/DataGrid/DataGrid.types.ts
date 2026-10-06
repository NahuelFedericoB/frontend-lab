import type { ComponentType, ReactNode } from 'react';

export type HeaderName = string;
export type SortDirection = 'up' | 'down' | null;
export type GridRow = Record<string, unknown> & { hidden?: boolean };
export type RowValues = GridRow;
export type RowFormatter<T extends GridRow = GridRow> = (
  values: T,
  cellId: string | null,
) => string | undefined;

export interface DataGridComponentProps<T extends GridRow = GridRow> {
  columnId: HeaderName | null;
  values: T;
  cellId: string | null;
  containerStyles: string;
  onContainerStylesChange: (styles: string) => void;
}

export type DataGridComponentFormatter<T extends GridRow = GridRow> = ComponentType<
  DataGridComponentProps<T>
>;

export interface DataGridHeader<T extends GridRow = GridRow> {
  header: HeaderName;
  label: string;
  hidden?: boolean | undefined;
  minWidth?: string | null | undefined;
  width?: string | null | undefined;
  maxWidth?: string | null | undefined;
  formatter?: RowFormatter<T> | null | undefined;
  component?: DataGridComponentFormatter<T> | null | undefined;
}

export interface ColumnSelection {
  headerName: HeaderName;
  direction: SortDirection;
}

export interface ColumnDrop {
  columnSource?: string;
  columnDestination?: string;
}

export type CheckedRow<T extends GridRow = GridRow> = Partial<T> & {
  rowId?: string | null;
  __checked: boolean;
};

export type CheckboxChangeHandler<T extends GridRow = GridRow> = (
  row: CheckedRow<T> | null,
  rows: CheckedRow<T>[] | null | undefined,
) => void;

export interface DataGridProps<T extends GridRow = GridRow> {
  id?: string | null;
  ariaLabel?: string | null;
  rowAriaLabel?: string | null;
  headers?: DataGridHeader<T>[];
  rows?: T[];
  onColumnClick?: ((params: ColumnSelection) => void) | null;
  onRowClick?: ((row: T, id: string | null) => void) | null;
  rowClassName?: string;
  activeRow?: string | null;
  sortDirection?: SortDirection;
  sortByColumn?: HeaderName | null;
  loading?: boolean;
  loadingMessage?: string;
  noDataMessage?: ReactNode;
  stickyHeader?: boolean;
  class?: string;
  hideDivisors?: boolean;
  gridOverflow?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  showCheckbox?: boolean;
  checkedRows?: CheckedRow<T>[];
  checkboxLeftPosition?: string | null;
  onCheckboxChange?: CheckboxChangeHandler<T> | null;
}
