import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';
import { Tab } from '../Tab/Tab';

import { Tabs } from './Tabs';
import tabsSource from './Tabs.tsx?raw';
import tabsTypesSource from './Tabs.types.ts?raw';
import tabsStylesSource from './Tabs.module.css?raw';
import testsSource from './Tabs.test.tsx?raw';
import styles from './Tabs.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Tabs.tsx', code: tabsSource },
  { name: 'Tabs.types.ts', code: tabsTypesSource },
  { name: 'Tabs.module.css', code: tabsStylesSource },
  { name: 'Tabs.test.tsx', code: testsSource },
];

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [firstTitle, setFirstTitle] = useState('Tab 1');
  const [secondTitle, setSecondTitle] = useState('Tab 2');
  const [thirdTitle, setThirdTitle] = useState('Tab 3');
  const [disabled, setDisabled] = useState(true);

  const usage = [
    "import { useState } from 'react';",
    "import { Tabs } from './components/Tabs/Tabs';",
    "import { Tab } from './components/Tab/Tab';",
    '',
    'export function TabsExample() {',
    `  const [activeTab, setActiveTab] = useState(${JSON.stringify(activeTab)});`,
    '',
    '  return (',
    '      <Tabs activeTab={activeTab} onSelect={setActiveTab}>',
    '        <Tab',
    '          tabKey="tab1"',
    '          activeTab={activeTab}',
    '          onSelect={setActiveTab}',
    `          title={${JSON.stringify(firstTitle)}}`,
    '        >',
    '          Tab 1 content',
    '        </Tab>',
    '        <Tab',
    '          tabKey="tab2"',
    '          activeTab={activeTab}',
    '          onSelect={setActiveTab}',
    `          title={${JSON.stringify(secondTitle)}}`,
    '        >',
    '          Tab 2 content',
    '        </Tab>',
    '        <Tab',
    '          tabKey="tab3"',
    '          activeTab={activeTab}',
    '          onSelect={setActiveTab}',
    `          title={${JSON.stringify(thirdTitle)}}`,
    ...(disabled ? ['          disabled'] : []),
    '        >',
    '          Tab 3 content',
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
            <Tab tabKey="tab1" activeTab={activeTab} onSelect={setActiveTab} title={firstTitle}>
              <div className={styles.content}>Tab 1 content</div>
            </Tab>
            <Tab tabKey="tab2" activeTab={activeTab} onSelect={setActiveTab} title={secondTitle}>
              <div className={styles.content}>Tab 2 content</div>
            </Tab>
            <Tab
              tabKey="tab3"
              activeTab={activeTab}
              onSelect={setActiveTab}
              title={thirdTitle}
              disabled={disabled}
            >
              <div className={styles.content}>Tab 3 content</div>
            </Tab>
          </Tabs>
        </div>
      }
      controls={
        <div className={styles.controls}>
          <label className={styles.field}>
            <span>Tab 1 title</span>
            <input value={firstTitle} onChange={(event) => setFirstTitle(event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Tab 2 title</span>
            <input value={secondTitle} onChange={(event) => setSecondTitle(event.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Tab 3 title</span>
            <input value={thirdTitle} onChange={(event) => setThirdTitle(event.target.value)} />
          </label>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />
            <span>Disable Tab 3</span>
          </label>
        </div>
      }
      usage={usage}
      sources={sources}
    />
  );
}
