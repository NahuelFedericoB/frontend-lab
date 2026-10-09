import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { TextField } from './TextField';
import { TextFieldControls, type TextFieldDemoOptions } from './TextFieldControls';
import componentSource from './TextField.tsx?raw';
import typesSource from './TextField.types.ts?raw';
import stylesSource from './TextField.module.css?raw';
import testSource from './TextField.test.tsx?raw';

import styles from './TextField.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'TextField.tsx', code: componentSource },
  { name: 'TextField.types.ts', code: typesSource },
  { name: 'TextField.module.css', code: stylesSource },
  { name: 'TextField.test.tsx', code: testSource },
];

export function TextFieldDemo() {
  const [options, setOptions] = useState<TextFieldDemoOptions>({
    placeholder: 'Enter your username',
    size: 'md',
    disabled: false,
    readonly: false,
    valid: false,
    invalid: false,
  });

  const usage = [
    "import { TextField } from './components/TextField/TextField';",
    '',
    '<TextField',
    '  ariaLabel="Username"',
    `  placeholder={${JSON.stringify(options.placeholder)}}`,
    `  size="${options.size}"`,
    ...(options.disabled ? ['  disabled'] : []),
    ...(options.readonly ? ['  readonly'] : []),
    ...(options.valid ? ['  valid'] : []),
    ...(options.invalid ? ['  invalid'] : []),
    '/>',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <div className={styles.preview}>
          <TextField {...options} ariaLabel="Username" />
        </div>
      }
      controls={<TextFieldControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
