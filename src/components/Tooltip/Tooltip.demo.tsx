import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { Tooltip } from './Tooltip';
import type { TooltipPlacement } from './Tooltip.types';
import componentSource from './Tooltip.tsx?raw';
import typesSource from './Tooltip.types.ts?raw';
import stylesSource from './Tooltip.module.css?raw';
import testsSource from './Tooltip.test.tsx?raw';

import styles from './Tooltip.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Tooltip.tsx', code: componentSource },
  { name: 'Tooltip.types.ts', code: typesSource },
  { name: 'Tooltip.module.css', code: stylesSource },
  { name: 'Tooltip.test.tsx', code: testsSource },
];

const placements: readonly TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];

export function TooltipDemo() {
  const [message, setMessage] = useState('More information');
  const [placement, setPlacement] = useState<TooltipPlacement>('top');
  const usage = [
    "import { Tooltip } from './components/Tooltip/Tooltip';",
    '',
    '<>',
    '  <span id="tooltip-target">Hover over me</span>',
    `  <Tooltip target="tooltip-target" placement="${placement}">`,
    `    {${JSON.stringify(message)}}`,
    '  </Tooltip>',
    '</>',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <>
          <span id="tooltip-demo-target" className={styles.target}>
            Hover over me
          </span>
          <Tooltip target="tooltip-demo-target" placement={placement}>
            {message}
          </Tooltip>
        </>
      }
      controls={
        <div className={styles.controls}>
          <label className={styles.field}>
            <span>Tooltip text</span>
            <input value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Placement</span>
            <select
              value={placement}
              onChange={(event) => setPlacement(event.target.value as TooltipPlacement)}
            >
              {placements.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>
      }
      usage={usage}
      sources={sources}
    />
  );
}
