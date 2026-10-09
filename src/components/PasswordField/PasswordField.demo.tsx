import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { PasswordField } from './PasswordField';
import { PasswordFieldControls, type PasswordFieldDemoOptions } from './PasswordFieldControls';
import componentSource from './PasswordField.tsx?raw';
import typesSource from './PasswordField.types.ts?raw';
import stylesSource from './PasswordField.module.css?raw';
import testSource from './PasswordField.test.tsx?raw';
import styles from './PasswordFieldControls.module.css';

const sources: readonly SourceFile[] = [
  { name: 'PasswordField.tsx', code: componentSource },
  { name: 'PasswordField.types.ts', code: typesSource },
  { name: 'PasswordField.module.css', code: stylesSource },
  { name: 'PasswordField.test.tsx', code: testSource },
];

export function PasswordFieldDemo() {
  const [options, setOptions] = useState<PasswordFieldDemoOptions>({
    placeholder: 'Enter your password',
    size: 'md',
    disabled: false,
    readOnly: false,
    valid: false,
    invalid: false,
  });

  const usage = [
    "import { PasswordField } from './components/PasswordField/PasswordField';",
    '',
    '<PasswordField',
    '  ariaLabel="Password"',
    `  placeholder={${JSON.stringify(options.placeholder)}}`,
    `  size="${options.size}"`,
    ...(options.disabled ? ['  disabled'] : []),
    ...(options.readOnly ? ['  readOnly'] : []),
    ...(options.valid ? ['  valid'] : []),
    ...(options.invalid ? ['  invalid'] : []),
    '/>',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <div className={styles.preview}>
          <PasswordField {...options} ariaLabel="Password" />
        </div>
      }
      controls={<PasswordFieldControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
