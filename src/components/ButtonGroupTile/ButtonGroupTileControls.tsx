import type { ButtonGroupTileProps } from './ButtonGroupTile.types';

import styles from './ButtonGroupTileControls.module.css';

export interface ButtonGroupTileDemoOptions {
  label: string;
  size: NonNullable<ButtonGroupTileProps['size']>;
  vertical: boolean;
  disabled: boolean;
  active: boolean;
}

interface ButtonGroupTileControlsProps {
  options: ButtonGroupTileDemoOptions;
  onChange: (options: ButtonGroupTileDemoOptions) => void;
}

export function ButtonGroupTileControls({ options, onChange }: ButtonGroupTileControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.field}>
        <span>Label</span>
        <input
          value={options.label}
          onChange={(event) => onChange({ ...options, label: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Size</span>
        <select
          value={options.size}
          onChange={(event) =>
            onChange({ ...options, size: event.target.value as ButtonGroupTileDemoOptions['size'] })
          }
        >
          <option value="sm">SM</option>
          <option value="md">MD</option>
          <option value="lg">LG</option>
        </select>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={options.vertical}
          onChange={(event) => onChange({ ...options, vertical: event.target.checked })}
        />
        <span>Vertical</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={options.disabled}
          onChange={(event) => onChange({ ...options, disabled: event.target.checked })}
        />
        <span>Disabled</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={options.active}
          onChange={(event) => onChange({ ...options, active: event.target.checked })}
        />
        <span>Active</span>
      </label>
    </div>
  );
}
