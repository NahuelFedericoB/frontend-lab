import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { SwitchButton } from './SwitchButton';
import type { SwitchButtonProps } from './SwitchButton.types';
import { SwitchButtonControls, type SwitchButtonDemoOptions } from './SwitchButtonControls';
import componentSource from './SwitchButton.tsx?raw';
import typesSource from './SwitchButton.types.ts?raw';
import stylesSource from './SwitchButton.module.css?raw';
import testSource from './SwitchButton.test.tsx?raw';

const sources: readonly SourceFile[] = [
  { name: 'SwitchButton.tsx', code: componentSource },
  { name: 'SwitchButton.types.ts', code: typesSource },
  { name: 'SwitchButton.module.css', code: stylesSource },
  { name: 'SwitchButton.test.tsx', code: testSource },
];

export function SwitchButtonDemo() {
  const [activeSide, setActiveSide] =
    useState<NonNullable<SwitchButtonProps['activeSide']>>('left');
  const [options, setOptions] = useState<SwitchButtonDemoOptions>({
    leftLabel: 'Left',
    rightLabel: 'Right',
    size: 'md',
    disabled: false,
  });

  const usage = [
    "import { useState } from 'react';",
    "import { SwitchButton } from './components/SwitchButton/SwitchButton';",
    '',
    'export function SwitchButtonExample() {',
    "  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left');",
    '',
    '  return (',
    '    <SwitchButton',
    '      ariaLabel="Switch active side"',
    `      leftLabel={${JSON.stringify(options.leftLabel)}}`,
    `      rightLabel={${JSON.stringify(options.rightLabel)}}`,
    `      size="${options.size}"`,
    ...(options.disabled ? ['      disabled'] : []),
    '      activeSide={activeSide}',
    "      onclick={() => setActiveSide((side) => (side === 'left' ? 'right' : 'left'))}",
    '    />',
    '  );',
    '}',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <SwitchButton
          {...options}
          ariaLabel="Switch active side"
          activeSide={activeSide}
          onclick={() => setActiveSide((side) => (side === 'left' ? 'right' : 'left'))}
        />
      }
      controls={<SwitchButtonControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
