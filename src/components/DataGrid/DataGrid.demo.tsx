import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';

import { DataGridExample } from './demo/DataGridExample';
import { DataGridControls } from './demo/DataGridControls';
import { defaultOptions } from './demo/demoData';
import { sources } from './DataGrid.sources';
import exampleSource from './demo/DataGridExample.tsx?raw';

export function DataGridDemo() {
  const [options, setOptions] = useState(defaultOptions);
  const usage = `${exampleSource}\n// Current preview options\n<DataGridExample options={${JSON.stringify(options, null, 2)}} />`;

  return (
    <ComponentViewer
      preview={<DataGridExample options={options} />}
      controls={<DataGridControls options={options} onChange={setOptions} />}
      usage={usage}
      sources={sources}
    />
  );
}
