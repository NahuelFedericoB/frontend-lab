import { useState } from 'react';

import { DataGrid } from '../DataGrid';
import type { CheckedRow, CheckboxChangeHandler, ColumnSelection } from '../DataGrid.types';

import {
  headers,
  rows,
  defaultOptions,
  type DataGridDemoOptions,
  type TeamMember,
} from './demoData';

import styles from './DataGridExample.module.css';

export function DataGridExample({ options = defaultOptions }: { options?: DataGridDemoOptions }) {
  const [sort, setSort] = useState<ColumnSelection>({ headerName: 'name', direction: 'up' });
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [checkedRows, setCheckedRows] = useState<CheckedRow<TeamMember>[]>([]);

  const sortedRows = [...rows].sort((first, second) => {
    const column = sort.headerName as keyof TeamMember;
    const comparison = first[column].localeCompare(second[column]);
    return sort.direction === 'up' ? comparison : -comparison;
  });

  function handleColumnClick({ headerName, direction }: ColumnSelection) {
    setSort({ headerName, direction: direction === 'up' ? 'down' : 'up' });
    setActiveRow(null);
    setCheckedRows([]);
  }

  const handleCheckboxChange: CheckboxChangeHandler<TeamMember> = (row, allRows) => {
    if (allRows) {
      setCheckedRows(allRows);
      return;
    }
    if (row) {
      setCheckedRows((current) => [...current.filter((item) => item.rowId !== row.rowId), row]);
    }
  };

  return (
    <div className={styles.container}>
      <DataGrid
        ariaLabel="Team members"
        headers={headers}
        rows={options.emptyRows ? [] : sortedRows}
        sortByColumn={sort.headerName}
        sortDirection={sort.direction}
        onColumnClick={handleColumnClick}
        activeRow={activeRow}
        onRowClick={(row, id) => {
          setActiveRow(id);
          window.alert(`Selected ${row.name}. The onRowClick action was executed.`);
        }}
        checkedRows={checkedRows}
        onCheckboxChange={handleCheckboxChange}
        loading={options.loading}
        showCheckbox={options.showCheckbox}
        stickyHeader={options.stickyHeader}
        draggable={options.draggable}
        resizable={options.resizable}
        hideDivisors={options.hideDivisors}
        gridOverflow
      />
    </div>
  );
}
