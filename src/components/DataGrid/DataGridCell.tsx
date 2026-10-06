import { useLayoutEffect, useRef, useState } from 'react';

import isJsObject from '../../utils/isJsObject';
import type { DataGridHeader, GridRow } from './DataGrid.types';

import styles from './DataGridCell.module.css';

interface DataGridCellProps<T extends GridRow> extends Omit<DataGridHeader<T>, 'header' | 'label'> {
  id?: string | null;
  header?: string | null;
  row?: T;
  isLast?: boolean;
  hideDivisors?: boolean;
}

function convertToValidValue(value: unknown): unknown {
  if (value !== undefined) {
    if (isJsObject(value) || Array.isArray(value)) {
      return value;
    }
    return `${value}`;
  }
  return '';
}

export function DataGridCell<T extends GridRow>({
  id = null,
  header = null,
  row = {} as T,
  formatter = null,
  minWidth = null,
  width = null,
  maxWidth = null,
  hidden = false,
  isLast = false,
  component: Component = null,
  hideDivisors = false,
}: DataGridCellProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [containerStyles, setContainerStyles] = useState(' ');

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.cssText = containerStyles;
      ref.current.style.width = width ?? '';
      ref.current.style.minWidth = minWidth ?? '';
      ref.current.style.maxWidth = maxWidth ?? '';
    }
  }, [containerStyles, width, minWidth, maxWidth]);

  const createValue = () => {
    const cellValue = convertToValidValue(row[header ?? 'null']);
    if (formatter) {
      return formatter(row, id);
    }

    return String(cellValue);
  };

  return (
    <div
      ref={ref}
      id={id ?? undefined}
      className={[
        styles.cell,
        isLast && styles.isLast,
        hidden && styles.hideCell,
        hideDivisors && styles.hideDivisors,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden={hidden}
      role="gridcell"
    >
      <div className={styles.cellContent}>
        {Component ? (
          <Component
            columnId={header}
            values={row}
            cellId={id}
            containerStyles={containerStyles}
            onContainerStylesChange={setContainerStyles}
          />
        ) : (
          createValue()
        )}
      </div>
    </div>
  );
}
