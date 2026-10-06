import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';
import { Tabs } from '../Tabs/Tabs';

import { Tab } from './Tab';
import tabSource from './Tab.tsx?raw';
import typesSource from './Tab.types.ts?raw';
import stylesSource from './Tab.module.css?raw';
import testsSource from './Tab.test.tsx?raw';

import styles from './Tab.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Tab.tsx', code: tabSource },
  { name: 'Tab.types.ts', code: typesSource },
  { name: 'Tab.module.css', code: stylesSource },
  { name: 'Tab.test.tsx', code: testsSource },
];

export function TabDemo() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [title, setTitle] = useState('Tab');

  const usage = [
    "import { useState } from 'react';",
    "import { Tabs } from './components/Tabs/Tabs';",
    "import { Tab } from './components/Tab/Tab';",
    '',
    'export function TabExample() {',
    `  const [activeTab, setActiveTab] = useState(${JSON.stringify(activeTab)});`,
    '',
    '  return (',
    '      <Tabs activeTab={activeTab} onSelect={setActiveTab}>',
    '        <Tab',
    '          tabKey="tab1"',
    `          title={${JSON.stringify(title)}}`,
    '          activeTab={activeTab}',
    '          onSelect={setActiveTab}',
    '        >',
    `          Tab Content`,
    '        </Tab>',
    '      </Tabs>',
    '  );',
    '}',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <div className={styles.preview}>
          <Tabs activeTab={activeTab} onSelect={setActiveTab}>
            <Tab tabKey="tab1" title={title} activeTab={activeTab} onSelect={setActiveTab}>
              <div className={styles.content}>Tab Content</div>
            </Tab>
          </Tabs>
        </div>
      }
      controls={
        <div className={styles.controls}>
          <label className={styles.field}>
            <span>Title</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
        </div>
      }
      usage={usage}
      sources={sources}
    />
  );
}
