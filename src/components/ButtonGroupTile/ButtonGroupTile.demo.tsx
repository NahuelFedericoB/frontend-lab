import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { ButtonGroupTile } from './ButtonGroupTile';
import {
  ButtonGroupTileControls,
  type ButtonGroupTileDemoOptions,
} from './ButtonGroupTileControls';
import componentSource from './ButtonGroupTile.tsx?raw';
import typesSource from './ButtonGroupTile.types.ts?raw';
import stylesSource from './ButtonGroupTile.module.css?raw';
import testSource from './ButtonGroupTile.test.tsx?raw';

const sources: readonly SourceFile[] = [
  { name: 'ButtonGroupTile.tsx', code: componentSource },
  { name: 'ButtonGroupTile.types.ts', code: typesSource },
  { name: 'ButtonGroupTile.module.css', code: stylesSource },
  { name: 'ButtonGroupTile.test.tsx', code: testSource },
];

export function ButtonGroupTileDemo() {
  const [options, setOptions] = useState<ButtonGroupTileDemoOptions>({
    label: 'Button 1',
    size: 'md',
    vertical: false,
    disabled: false,
    active: false,
  });

  const usage = [
    "import { ButtonGroupTile } from './components/ButtonGroupTile/ButtonGroupTile';",
    '',
    '<ButtonGroupTile',
    `  size="${options.size}"`,
    ...(options.vertical ? ['  vertical'] : []),
    ...(options.disabled ? ['  disabled'] : []),
    ...(options.active ? ['  active'] : []),
    "  onClick={() => window.alert('Clicked')}",
    '>',
    `  {${JSON.stringify(options.label)}}`,
    '</ButtonGroupTile>',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <ButtonGroupTile
          size={options.size}
          vertical={options.vertical}
          disabled={options.disabled}
          active={options.active}
          onClick={() => window.alert('Clicked')}
        >
          {options.label}
        </ButtonGroupTile>
      }
      controls={<ButtonGroupTileControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
