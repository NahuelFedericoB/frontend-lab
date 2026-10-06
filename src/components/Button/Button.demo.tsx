import { useState } from 'react';

import keyboardSource from '../../utils/handleKeyDown.ts?raw';
import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { Button } from './Button';
import type { ButtonColor, ButtonSize, ButtonType } from './Button.types';
import buttonSource from './Button.tsx?raw';
import stylesSource from './Button.module.css?raw';
import typesSource from './Button.types.ts?raw';
import testsSource from './Button.test.tsx?raw';
import styles from './Button.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Button.tsx', code: buttonSource },
  { name: 'Button.types.ts', code: typesSource },
  { name: 'Button.module.css', code: stylesSource },
  { name: 'Button.test.tsx', code: testsSource },
  { name: 'handleKeyDown.ts', code: keyboardSource },
];

const colors: readonly { value: ButtonColor; label: string }[] = [
  { value: 'primary', label: 'Primary · Sky blue' },
  { value: 'light', label: 'Light · Pale blue' },
  { value: 'danger', label: 'Danger · Red' },
  { value: 'success', label: 'Success · Green' },
  { value: 'warning', label: 'Warning · Yellow' },
];
const sizes: readonly ButtonSize[] = ['xxs', 'xs', 'sm', 'md', 'lg'];
const types: readonly ButtonType[] = ['button', 'reset', 'submit'];

export function ButtonDemo() {
  const [label, setLabel] = useState('Button');
  const [color, setColor] = useState<ButtonColor>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [type, setType] = useState<ButtonType>('button');
  const [disabled, setDisabled] = useState(false);
  const [disableFocus, setDisableFocus] = useState(false);

  const usage = [
    "import { Button } from './components/Button/Button';",
    '',
    '<Button',
    `  color="${color}"`,
    `  size="${size}"`,
    `  type="${type}"`,
    "  onClick={() => window.alert('Action executed')}",
    ...(disabled ? ['  disabled'] : []),
    ...(disableFocus ? ['  disableFocus'] : []),
    '>',
    `  {${JSON.stringify(label)}}`,
    '</Button>',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <Button
          color={color}
          size={size}
          type={type}
          disabled={disabled}
          disableFocus={disableFocus}
          onClick={() => window.alert('Action executed')}
        >
          {label}
        </Button>
      }
      controls={
        <div className={styles.controls}>
          <label className={styles.field}>
            <span>Label</span>
            <input type="text" value={label} onChange={(event) => setLabel(event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Color</span>
            <select value={color} onChange={(event) => setColor(event.target.value as ButtonColor)}>
              {colors.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Size</span>
              <select value={size} onChange={(event) => setSize(event.target.value as ButtonSize)}>
                {sizes.map((option) => (
                  <option key={option} value={option}>
                    {option.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Type</span>
              <select value={type} onChange={(event) => setType(event.target.value as ButtonType)}>
                {types.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />
            <span>Disabled</span>
          </label>
          <div>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={disableFocus}
                onChange={(event) => setDisableFocus(event.target.checked)}
              />
              <span>Disable focus</span>
            </label>
          </div>
        </div>
      }
      usage={usage}
      sources={sources}
    />
  );
}
