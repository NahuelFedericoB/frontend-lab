import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { Checkbox } from './Checkbox';
import { CheckboxControls, type CheckboxDemoOptions } from './CheckboxControls';
import componentSource from './Checkbox.tsx?raw';
import typesSource from './Checkbox.types.ts?raw';
import stylesSource from './Checkbox.module.css?raw';

import styles from './Checkbox.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Checkbox.tsx', code: componentSource },
  { name: 'Checkbox.types.ts', code: typesSource },
  { name: 'Checkbox.module.css', code: stylesSource },
];

export function CheckboxDemo() {
  const [options, setOptions] = useState<CheckboxDemoOptions>({
    label: 'Receive updates',
    size: 'md',
    checked: false,
    disabled: false,
    indeterminate: false,
    validation: 'default',
  });

  const usage = [
    "import { useState } from 'react';",
    "import { Checkbox } from './components/Checkbox/Checkbox';",
    '',
    'export function CheckboxExample() {',
    `  const [checked, setChecked] = useState(${options.checked});`,
    `  const [indeterminate, setIndeterminate] = useState(${options.indeterminate});`,
    '',
    '  return (',
    '    <label>',
    '      <Checkbox',
    `        size="${options.size}"`,
    '        checked={checked}',
    '        indeterminate={indeterminate}',
    ...(options.disabled ? ['        disabled'] : []),
    ...(options.validation !== 'default' ? [`        ${options.validation}`] : []),
    '        onChange={(event) => {',
    '          setChecked(event.target.checked);',
    '          setIndeterminate(false);',
    '        }}',
    '      />',
    `      {${JSON.stringify(options.label)}}`,
    '    </label>',
    '  );',
    '}',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <label className={styles.label}>
          <Checkbox
            size={options.size}
            checked={options.checked}
            disabled={options.disabled}
            indeterminate={options.indeterminate}
            valid={options.validation === 'valid'}
            invalid={options.validation === 'invalid'}
            onChange={(event) =>
              setOptions({ ...options, checked: event.target.checked, indeterminate: false })
            }
          />
          <span>{options.label}</span>
        </label>
      }
      controls={<CheckboxControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
