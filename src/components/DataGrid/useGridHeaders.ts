import { useState } from 'react';

import type { ColumnDrop, DataGridHeader, GridRow } from './DataGrid.types';

export function useGridHeaders<T extends GridRow>(headers: DataGridHeader<T>[]) {
  const [state, setState] = useState({ source: headers, headers });
  if (state.source !== headers) setState({ source: headers, headers });

  function handleColumnResize(headerName: string, newWidth: number) {
    setState((current) => ({
      ...current,
      headers: current.headers.map((header) =>
        header.header === headerName
          ? { ...header, minWidth: `${newWidth}px`, maxWidth: `${newWidth}px` }
          : header,
      ),
    }));
  }

  function reorganizeHeaders({ columnSource, columnDestination }: ColumnDrop) {
    setState((current) => {
      const updated = [...current.headers];
      const sourceIndex = updated.findIndex((header) => header.header === columnSource);
      const destinationIndex = updated.findIndex((header) => header.header === columnDestination);
      const source = updated[sourceIndex];
      const destination = updated[destinationIndex];
      if (!source || !destination) return current;
      updated[sourceIndex] = destination;
      updated[destinationIndex] = source;
      return { ...current, headers: updated };
    });
  }

  return { headers: state.headers, handleColumnResize, reorganizeHeaders };
}
