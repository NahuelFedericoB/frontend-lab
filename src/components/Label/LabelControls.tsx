import type { LabelProps } from './Label.types';

import styles from './LabelControls.module.css';

export interface LabelDemoOptions {
  label: string;
  size: NonNullable<LabelProps['size']>;
  required: boolean;
  disabled: boolean;
}

interface LabelControlsProps {
  options: LabelDemoOptions;
  onChange: (options: LabelDemoOptions) => void;
}

export function LabelControls({ options, onChange }: LabelControlsProps) {
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
            onChange({ ...options, size: event.target.value as LabelDemoOptions['size'] })
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
          checked={options.required}
          onChange={(event) => onChange({ ...options, required: event.target.checked })}
        />
        <span>Required</span>
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
