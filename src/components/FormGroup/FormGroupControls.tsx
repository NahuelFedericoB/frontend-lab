import type { FormGroupProps } from './FormGroup.types';

import styles from './FormGroupControls.module.css';

export type FormGroupDemoOptions = Required<Pick<FormGroupProps, 'hint' | 'hintColor' | 'error'>>;

interface FormGroupControlsProps {
  options: FormGroupDemoOptions;
  onChange: (options: FormGroupDemoOptions) => void;
}

export function FormGroupControls({ options, onChange }: FormGroupControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.field}>
        <span>Username hint</span>
        <input
          value={options.hint}
          onChange={(event) => onChange({ ...options, hint: event.target.value })}
        />
      </label>
      <label className={styles.field}>
        <span>Hint color</span>
        <select
          value={options.hintColor}
          onChange={(event) => onChange({ ...options, hintColor: event.target.value })}
        >
          <option value="">Default</option>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="success">Success</option>
          <option value="danger">Danger</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label className={styles.field}>
        <span>Username error</span>
        <input
          value={options.error}
          placeholder="Enter an error message"
          onChange={(event) => onChange({ ...options, error: event.target.value })}
        />
      </label>
    </div>
  );
}
