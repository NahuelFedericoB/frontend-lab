import type { ChangeEvent, KeyboardEvent } from 'react';

import { Checkbox } from '../Checkbox/Checkbox';
import type { CheckedRow, CheckboxChangeHandler, GridRow } from './DataGrid.types';

import styles from './DataGridCheckbox.module.css';

interface DataGridCheckboxProps<T extends GridRow> {
  rowId: string | null;
  rows?: T[] | null;
  row?: T | null;
  leftPosition?: string | null;
  indeterminate?: boolean | undefined;
  checkedRows?: CheckedRow<T>[];
  onchange?: CheckboxChangeHandler<T> | null;
}

export function DataGridCheckbox<T extends GridRow>({
  rowId,
  onchange,
  checkedRows = [],
  rows = null,
  row = null,
  leftPosition = null,
  indeterminate = false,
}: DataGridCheckboxProps<T>) {
  function handleClick(event: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const formattedRows = rows
      ?.filter((item) => !item.hidden)
      .map((item, index) => ({
        ...item,
        rowId: `row_${index}`,
        __checked: target.checked,
      }));

    onchange?.({ ...row, rowId, __checked: target.checked } as CheckedRow<T>, formattedRows);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation();
      handleClick(event);
    }
  }

  const isChecked = () => {
    const rowCount = rows?.filter((item) => !item.hidden).length;
    if (checkedRows.length === rowCount && checkedRows.every((item) => item.__checked === true)) {
      return true;
    }

    return checkedRows.some((item) => item.rowId === rowId && item.__checked);
  };

  return (
    <div
      className={`${styles.cell} ${styles.sticky}`}
      style={{ left: leftPosition ?? undefined }}
      role="cell"
      onClick={(event) => event.stopPropagation()}
    >
      <Checkbox
        checked={isChecked()}
        onChange={handleClick}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        indeterminate={indeterminate}
      />
    </div>
  );
}
