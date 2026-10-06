import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { Spinner } from './Spinner';
import type { SpinnerSize } from './Spinner.types';
import spinnerSource from './Spinner.tsx?raw';
import typesSource from './Spinner.types.ts?raw';
import stylesSource from './Spinner.module.css?raw';
import testsSource from './Spinner.test.tsx?raw';
import styles from './Spinner.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Spinner.tsx', code: spinnerSource },
  { name: 'Spinner.types.ts', code: typesSource },
  { name: 'Spinner.module.css', code: stylesSource },
  { name: 'Spinner.test.tsx', code: testsSource },
];

const sizes: readonly SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function SpinnerDemo() {
  const [size, setSize] = useState<SpinnerSize>('md');
  const [color, setColor] = useState('primary');
  const [message, setMessage] = useState('Loading...');

  const usage = [
    "import { Spinner } from './components/Spinner/Spinner';",
    '',
    `<Spinner size="${size}" color={${JSON.stringify(color)}}>`,
    `  {${JSON.stringify(message)}}`,
    '</Spinner>',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <Spinner size={size} color={color}>
          {message}
        </Spinner>
      }
      controls={
        <div className={styles.controls}>
          <label className={styles.field}>
            <span>Message</span>
            <input value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Size</span>
            <select value={size} onChange={(event) => setSize(event.target.value as SpinnerSize)}>
              {sizes.map((value) => (
                <option key={value} value={value}>
                  {value.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Color</span>
            <input
              value={color}
              onChange={(event) => setColor(event.target.value)}
              aria-describedby="spinner-colors"
            />
          </label>
          <p id="spinner-colors" className={styles.hint}>
            Use primary, secondary, success, danger, warning, info, dark, or any CSS color.
          </p>
        </div>
      }
      usage={usage}
      sources={sources}
    />
  );
}
