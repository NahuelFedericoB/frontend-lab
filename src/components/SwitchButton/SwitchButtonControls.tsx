import type { SwitchButtonProps } from './SwitchButton.types';

import styles from './SwitchButtonControls.module.css';

export interface SwitchButtonDemoOptions {
  leftLabel: string;
  rightLabel: string;
  size: NonNullable<SwitchButtonProps['size']>;
  disabled: boolean;
}

interface SwitchButtonControlsProps {
  options: SwitchButtonDemoOptions;
  onChange: (options: SwitchButtonDemoOptions) => void;
}

export function SwitchButtonControls({ options, onChange }: SwitchButtonControlsProps) {
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
        <span>Right label</span>
        <input
          value={options.rightLabel}
          onChange={(event) => onChange({ ...options, rightLabel: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Size</span>
        <select
          value={options.size}
          onChange={(event) =>
            onChange({ ...options, size: event.target.value as SwitchButtonDemoOptions['size'] })
          }
        >
          <option value="xs">XS</option>
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
        <span>Disabled</span>
      </label>
    </div>
  );
}
