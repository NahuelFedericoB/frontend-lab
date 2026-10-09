import type { PasswordFieldProps } from './PasswordField.types';

import styles from './PasswordFieldControls.module.css';

export interface PasswordFieldDemoOptions {
  placeholder: string;
  size: NonNullable<PasswordFieldProps['size']>;
  disabled: boolean;
  readOnly: boolean;
  valid: boolean;
  invalid: boolean;
}

interface PasswordFieldControlsProps {
  options: PasswordFieldDemoOptions;
  onChange: (options: PasswordFieldDemoOptions) => void;
}

export function PasswordFieldControls({ options, onChange }: PasswordFieldControlsProps) {
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
            onChange({ ...options, size: event.target.value as PasswordFieldDemoOptions['size'] })
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
        <span>Disabled</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={options.readOnly}
          onChange={(event) => onChange({ ...options, readOnly: event.target.checked })}
        />
        <span>Read only</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={options.valid}
          onChange={(event) => onChange({ ...options, valid: event.target.checked })}
        />
        <span>Valid</span>
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={options.invalid}
          onChange={(event) => onChange({ ...options, invalid: event.target.checked })}
        />
        <span>Invalid</span>
      </label>
    </div>
  );
}
