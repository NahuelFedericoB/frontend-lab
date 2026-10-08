import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { ButtonGroupControls, type ButtonGroupDemoOptions } from './ButtonGroupControls';
import { ButtonGroupCustomContent } from './ButtonGroupCustomContent';
import { getButtonGroupUsage } from './getButtonGroupUsage';
import componentSource from './ButtonGroup.tsx?raw';
import typesSource from './ButtonGroup.types.ts?raw';
import stylesSource from './ButtonGroup.module.css?raw';
import testSource from './ButtonGroup.test.tsx?raw';

const sources: readonly SourceFile[] = [
  { name: 'ButtonGroup.tsx', code: componentSource },
  { name: 'ButtonGroup.types.ts', code: typesSource },
  { name: 'ButtonGroup.module.css', code: stylesSource },
  { name: 'ButtonGroup.test.tsx', code: testSource },
];

export function ButtonGroupDemo() {
  const [options, setOptions] = useState<ButtonGroupDemoOptions>({
    leftLabel: 'Left',
    middleLabel: 'Middle',
    rightLabel: 'Right',
    size: 'md',
    disabled: false,
  });

  return (
    <ComponentViewer
      preview={<ButtonGroupCustomContent {...options} />}
      controls={<ButtonGroupControls options={options} onChange={setOptions} />}
      usage={getButtonGroupUsage(options)}
      sources={sources}
    />
  );
}
