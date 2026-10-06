import { useEffect } from 'react';
import type { DataGridComponentProps } from '../DataGrid.types';

export function StyledCell({
  columnId,
  values,
  cellId,
  onContainerStylesChange,
}: DataGridComponentProps) {
  useEffect(() => {
    onContainerStylesChange('background-color: lightblue; padding-left: 8px; width: 300px;');
  }, [onContainerStylesChange]);

  return <span id={`${cellId}_content`}>{String(values[columnId ?? ''])}</span>;
}
