import { useState } from 'react';

import { ComponentViewer } from '../../playground/components/ComponentViewer/ComponentViewer';
import type { SourceFile } from '../../playground/types';

import { Pagination } from './Pagination';
import { PaginationControls, type PaginationDemoOptions } from './PaginationControls';
import componentSource from './Pagination.tsx?raw';
import typesSource from './Pagination.types.ts?raw';
import stylesSource from './Pagination.module.css?raw';
import testSource from './Pagination.test.tsx?raw';

import styles from './Pagination.demo.module.css';

const sources: readonly SourceFile[] = [
  { name: 'Pagination.tsx', code: componentSource },
  { name: 'Pagination.types.ts', code: typesSource },
  { name: 'Pagination.module.css', code: stylesSource },
  { name: 'Pagination.test.tsx', code: testSource },
];

export function PaginationDemo() {
  const [activePage, setActivePage] = useState(1);
  const [options, setOptions] = useState<PaginationDemoOptions>({
    size: 'md',
    pages: 10,
    pagesPerSegment: 3,
  });

  const handleOptionsChange = (nextOptions: PaginationDemoOptions) => {
    setOptions(nextOptions);
    setActivePage(Math.min(activePage, nextOptions.pages));
  };

  const usage = [
    "import { useState } from 'react';",
    "import { Pagination } from './components/Pagination/Pagination';",
    '',
    'export function PaginationExample() {',
    `  const [activePage, setActivePage] = useState(${activePage});`,
    `  const pages = ${options.pages};`,
    '',
    '  return (',
    '    <Pagination',
    '      ariaLabel="Pagination"',
    `      size="${options.size}"`,
    '      pages={pages}',
    ...(options.pagesPerSegment > 0 ? [`      pagesPerSegment={${options.pagesPerSegment}}`] : []),
    '      activePage={activePage}',
    '      onPageClick={setActivePage}',
    '      onFirstClick={() => setActivePage(1)}',
    '      onPrevClick={() => setActivePage(activePage - 1)}',
    '      onNextClick={() => setActivePage(activePage + 1)}',
    '      onLastClick={() => setActivePage(pages)}',
    '    />',
    '  );',
    '}',
  ].join('\n');

  return (
    <ComponentViewer
      preview={
        <div className={styles.preview}>
          <Pagination
            ariaLabel="Pagination"
            size={options.size}
            pages={options.pages}
            pagesPerSegment={options.pagesPerSegment}
            activePage={activePage}
            onPageClick={setActivePage}
            onFirstClick={() => setActivePage(1)}
            onPrevClick={() => setActivePage(activePage - 1)}
            onNextClick={() => setActivePage(activePage + 1)}
            onLastClick={() => setActivePage(options.pages)}
          />
        </div>
      }
      controls={<PaginationControls options={options} onChange={handleOptionsChange} />}
      usage={usage}
      sources={sources}
    />
  );
}
