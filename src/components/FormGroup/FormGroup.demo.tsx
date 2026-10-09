import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';
import { FormGroupControls, type FormGroupDemoOptions } from './FormGroupControls';
import { FormGroupExample } from './FormGroupExample';
import { formGroupUsage } from './formGroupUsage';
import componentSource from './FormGroup.tsx?raw';
import typesSource from './FormGroup.types.ts?raw';
import stylesSource from './FormGroup.module.css?raw';

const sources: readonly SourceFile[] = [
  { name: 'FormGroup.tsx', code: componentSource },
  { name: 'FormGroup.types.ts', code: typesSource },
  { name: 'FormGroup.module.css', code: stylesSource },
];

export function FormGroupDemo() {
  const [options, setOptions] = useState<FormGroupDemoOptions>({
    hint: 'Choose the username for your account.',
    hintColor: '',
    error: '',
  });

  return (
    <ComponentViewer
      preview={<FormGroupExample {...options} />}
      controls={<FormGroupControls options={options} onChange={setOptions} />}
      usage={formGroupUsage(options)}
      sources={sources}
    />
  );
}
