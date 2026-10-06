import type { CheckboxProps } from './Checkbox.types';

import styles from './CheckboxControls.module.css';

export interface CheckboxDemoOptions {
  label: string;
  size: NonNullable<CheckboxProps['size']>;
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
  validation: 'default' | 'valid' | 'invalid';
}

interface CheckboxControlsProps {
  options: CheckboxDemoOptions;
  onChange: (options: CheckboxDemoOptions) => void;
}

const states = [
  { key: 'checked', label: 'Checked' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'indeterminate', label: 'Indeterminate' },
] as const;

export function CheckboxControls({ options, onChange }: CheckboxControlsProps) {
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
            onChange({ ...options, size: event.target.value as CheckboxDemoOptions['size'] })
          }
        >
          <option value="sm">SM</option>
          <option value="md">MD</option>
          <option value="lg">LG</option>
        </select>
      </label>
      <label className={styles.field}>
        <span>Validation</span>
        <select
          value={options.validation}
          onChange={(event) =>
            onChange({
              ...options,
              validation: event.target.value as CheckboxDemoOptions['validation'],
            })
          }
        >
          <option value="default">Default</option>
          <option value="valid">Valid</option>
          <option value="invalid">Invalid</option>
        </select>
      </label>
      {states.map(({ key, label }) => (
        <label className={styles.checkbox} key={key}>
          <input
            type="checkbox"
            checked={options[key]}
            onChange={(event) => onChange({ ...options, [key]: event.target.checked })}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}
