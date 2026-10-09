import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';
import { TextField } from '../TextField/TextField';

import { Label } from './Label';
import { LabelControls, type LabelDemoOptions } from './LabelControls';
import componentSource from './Label.tsx?raw';
import typesSource from './Label.types.ts?raw';
import stylesSource from './Label.module.css?raw';

import styles from './Label.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Label.tsx', code: componentSource },
  { name: 'Label.types.ts', code: typesSource },
  { name: 'Label.module.css', code: stylesSource },
];

export function LabelDemo() {
  const [options, setOptions] = useState<LabelDemoOptions>({
    label: 'Username',
    size: 'md',
    required: false,
    disabled: false,
  });

  const usage = [
    "import { Label } from './components/Label/Label';",
    "import { TextField } from './components/TextField/TextField';",
    '',
    '<div>',
    '  <Label',
    '    for="label-username"',
    `    size="${options.size}"`,
    ...(options.required ? ['    required'] : []),
    ...(options.disabled ? ['    disabled'] : []),
    '  >',
    `    {${JSON.stringify(options.label)}}`,
    '  </Label>',
    '  <TextField',
    '    id="label-username"',
    '    placeholder="Enter your username"',
    `    size="${options.size}"`,
    ...(options.disabled ? ['    disabled'] : []),
    '  />',
    '</div>',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <div className={styles.example}>
          <Label
            for="label-username"
            size={options.size}
            required={options.required}
            disabled={options.disabled}
          >
            {options.label}
          </Label>
          <TextField
            id="label-username"
            placeholder="Enter your username"
            size={options.size}
            disabled={options.disabled}
          />
        </div>
      }
      controls={<LabelControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
