import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { MultiTextFieldSelect } from './MultiTextFieldSelect';
import type { MultiTextFieldSelectOption } from './MultiTextFieldSelect.types';
import {
  MultiTextFieldSelectControls,
  type MultiTextFieldSelectDemoOptions,
} from './MultiTextFieldSelectControls';
import componentSource from './MultiTextFieldSelect.tsx?raw';
import typesSource from './MultiTextFieldSelect.types.ts?raw';
import stylesSource from './MultiTextFieldSelect.module.css?raw';
import testSource from './MultiTextFieldSelect.test.tsx?raw';

import styles from './MultiTextFieldSelect.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'MultiTextFieldSelect.tsx', code: componentSource },
  { name: 'MultiTextFieldSelect.types.ts', code: typesSource },
  { name: 'MultiTextFieldSelect.module.css', code: stylesSource },
  { name: 'MultiTextFieldSelect.test.tsx', code: testSource },
];

const people: MultiTextFieldSelectOption[] = [
  { label: 'John', value: '1' },
  { label: 'Barry', value: '2' },
  { label: 'Bruce', value: '3' },
  { label: 'Kara', value: '4' },
];

export function MultiTextFieldSelectDemo() {
  const [value, setValue] = useState<MultiTextFieldSelectOption[]>([]);
  const [options, setOptions] = useState<MultiTextFieldSelectDemoOptions>({
    placeholder: 'Select people',
    size: 'md',
    disabled: false,
    invalid: false,
    disableInput: false,
    clearable: true,
  });

  const usage = [
    "import { useState } from 'react';",
    "import { MultiTextFieldSelect } from './components/MultiTextFieldSelect/MultiTextFieldSelect';",
    "import type { MultiTextFieldSelectOption } from './components/MultiTextFieldSelect/MultiTextFieldSelect.types';",
    '',
    'const people: MultiTextFieldSelectOption[] = [',
    ...people.map(({ label, value }) => `  { label: '${label}', value: '${value}' },`),
    '];',
    '',
    'export function MultiTextFieldSelectExample() {',
    '  const [value, setValue] = useState<MultiTextFieldSelectOption[]>([]);',
    '',
    '  return (',
    '    <MultiTextFieldSelect',
    '      ariaLabel="People"',
    `      placeholder={${JSON.stringify(options.placeholder)}}`,
    `      size="${options.size}"`,
    ...(options.disabled ? ['      disabled'] : []),
    ...(options.invalid ? ['      invalid'] : []),
    ...(options.disableInput ? ['      disableInput'] : []),
    ...(!options.clearable ? ['      clearable={false}'] : []),
    '      options={people}',
    '      value={value}',
    '      onselectoption={setValue}',
    '    />',
    '  );',
    '}',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <div className={styles.preview}>
          <MultiTextFieldSelect
            {...options}
            ariaLabel="People"
            options={people}
            value={value}
            onselectoption={setValue}
          />
        </div>
      }
      controls={<MultiTextFieldSelectControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
