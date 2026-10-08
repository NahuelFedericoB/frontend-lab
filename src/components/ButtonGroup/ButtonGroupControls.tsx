import type { ButtonGroupTileProps } from '../ButtonGroupTile/ButtonGroupTile.types';

import styles from './ButtonGroupControls.module.css';

export interface ButtonGroupDemoOptions {
  leftLabel: string;
  middleLabel: string;
  rightLabel: string;
  size: NonNullable<ButtonGroupTileProps['size']>;
  disabled: boolean;
}

interface ButtonGroupControlsProps {
  options: ButtonGroupDemoOptions;
  onChange: (options: ButtonGroupDemoOptions) => void;
}

export function ButtonGroupControls({ options, onChange }: ButtonGroupControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.field}>
        <span>Left label</span>
        <input
          value={options.leftLabel}
          onChange={(event) => onChange({ ...options, leftLabel: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Middle label</span>
        <input
          value={options.middleLabel}
          onChange={(event) => onChange({ ...options, middleLabel: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Right label</span>
        <input
          value={options.rightLabel}
          onChange={(event) => onChange({ ...options, rightLabel: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Tile size</span>
        <select
          value={options.size}
          onChange={(event) =>
            onChange({ ...options, size: event.target.value as ButtonGroupDemoOptions['size'] })
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
          checked={options.disabled}
          onChange={(event) => onChange({ ...options, disabled: event.target.checked })}
        />
        <span>Disabled tiles</span>
      </label>
    </div>
  );
}
