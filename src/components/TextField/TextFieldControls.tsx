import type { TextFieldProps } from './TextField.types';

import styles from './TextFieldControls.module.css';

export interface TextFieldDemoOptions {
  placeholder: string;
  size: NonNullable<TextFieldProps['size']>;
  disabled: boolean;
  readonly: boolean;
  valid: boolean;
  invalid: boolean;
}

interface TextFieldControlsProps {
  options: TextFieldDemoOptions;
  onChange: (options: TextFieldDemoOptions) => void;
}

export function TextFieldControls({ options, onChange }: TextFieldControlsProps) {
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
            onChange({ ...options, size: event.target.value as TextFieldDemoOptions['size'] })
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
          checked={options.readonly}
          onChange={(event) => onChange({ ...options, readonly: event.target.checked })}
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
