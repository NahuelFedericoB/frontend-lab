import type { DataGridDemoOptions } from './demoData';

import styles from './DataGridControls.module.css';

const controls: { key: keyof DataGridDemoOptions; label: string }[] = [
  { key: 'loading', label: 'Loading' },
  { key: 'emptyRows', label: 'Empty rows' },
  { key: 'showCheckbox', label: 'Row checkboxes' },
  { key: 'stickyHeader', label: 'Sticky header' },
  { key: 'draggable', label: 'Draggable columns' },
  { key: 'resizable', label: 'Resizable columns' },
  { key: 'hideDivisors', label: 'Hide cell divisors' },
];

interface DataGridControlsProps {
  options: DataGridDemoOptions;
  onChange: (options: DataGridDemoOptions) => void;
}

export function DataGridControls({ options, onChange }: DataGridControlsProps) {
  return (
    <div className={styles.controls}>
      {controls.map(({ key, label }) => (
        <label key={key} className={styles.checkbox}>
          <input
            type="checkbox"
            checked={options[key]}
            onChange={(event) => onChange({ ...options, [key]: event.target.checked })}
          />
          <span>{label}</span>
        </label>
      ))}
      <p className={styles.hint}>
        Click a header to sort. Drag a header to swap columns, or drag its right edge to resize.
        Enter and Space activate focused headers and rows.
      </p>
    </div>
  );
}
