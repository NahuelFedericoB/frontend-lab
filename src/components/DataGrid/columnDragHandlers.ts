import type { DragEvent } from 'react';

import type { ColumnDrop } from './DataGrid.types';

import styles from './DataGridHeaderCell.module.css';

export function columnDragHandlers(draggable: boolean, onDrop: (params: ColumnDrop) => void) {
  return {
    onDragStart(event: DragEvent<HTMLDivElement>) {
      if (draggable) event.dataTransfer.setData('text', event.currentTarget.id);
    },

    onDragOver(event: DragEvent<HTMLDivElement>) {
      if (!draggable) return;
      event.preventDefault();
      if (event.dataTransfer.getData('text') !== event.currentTarget.id) {
        event.currentTarget.classList.add(styles.dragHover!);
      }
    },

    onDragLeave(event: DragEvent<HTMLDivElement>) {
      if (!draggable) return;
      event.preventDefault();
      if (event.dataTransfer.getData('text') !== event.currentTarget.id) {
        event.currentTarget.classList.remove(styles.dragHover!);
      }
    },

    onDrop(event: DragEvent<HTMLDivElement>) {
      if (!draggable) return;
      event.preventDefault();
      onDrop({
        columnSource: event.dataTransfer.getData('text') || '',
        columnDestination: event.currentTarget.id || '',
      });
      event.currentTarget.classList.remove(styles.dragHover!);
    },
  };
}
