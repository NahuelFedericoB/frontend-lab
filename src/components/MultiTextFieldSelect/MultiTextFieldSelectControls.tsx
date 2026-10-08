import type { MultiTextFieldSelectProps } from './MultiTextFieldSelect.types';

import styles from './MultiTextFieldSelectControls.module.css';

export interface MultiTextFieldSelectDemoOptions {
  placeholder: string;
  size: NonNullable<MultiTextFieldSelectProps['size']>;
  disabled: boolean;
  invalid: boolean;
  disableInput: boolean;
  clearable: boolean;
}

interface MultiTextFieldSelectControlsProps {
  options: MultiTextFieldSelectDemoOptions;
  onChange: (options: MultiTextFieldSelectDemoOptions) => void;
}

const states = [
  { key: 'disabled', label: 'Disabled' },
  { key: 'invalid', label: 'Invalid' },
  { key: 'disableInput', label: 'Disable input' },
  { key: 'clearable', label: 'Clearable' },
] as const;

export function MultiTextFieldSelectControls({
  options,
  onChange,
}: MultiTextFieldSelectControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.field}>
        <span>Placeholder</span>
        <input
          value={options.placeholder}
          onChange={(event) => onChange({ ...options, placeholder: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Size</span>
        <select
          value={options.size}
          onChange={(event) =>
            onChange({
              ...options,
              size: event.target.value as MultiTextFieldSelectDemoOptions['size'],
            })
          }
        >
          <option value="sm">SM</option>
          <option value="md">MD</option>
          <option value="lg">LG</option>
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
