import { useId, useState } from 'react';

import type { SourceFile } from '../../types';
import { CodeSnippet } from '../CodeSnippet/CodeSnippet';

import styles from './CodeViewer.module.css';

interface CodeViewerProps {
  usage: string;
  sources: readonly SourceFile[];
}

export function CodeViewer({ usage, sources }: CodeViewerProps) {
  const titleId = useId();
  const sourceSelectId = useId();
  const [view, setView] = useState<'usage' | 'source'>('usage');
  const [selectedSourceName, setSelectedSourceName] = useState<string>();
  const selectedSource = sources.find((source) => source.name === selectedSourceName) ?? sources[0];
  const code = view === 'usage' ? usage : selectedSource?.code;

  return (
    <section className={styles.panel} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h3 id={titleId}>Code</h3>
        <div className={styles.viewOptions} role="group" aria-label="Code view">
          <button
            type="button"
            className={styles.viewButton}
            aria-pressed={view === 'usage'}
            onClick={() => setView('usage')}
          >
            Usage
          </button>
          <button
            type="button"
            className={styles.viewButton}
            aria-pressed={view === 'source'}
            onClick={() => setView('source')}
          >
            Source
          </button>
        </div>
      </header>

      <div className={styles.description}>
        <p>
          {view === 'usage'
            ? 'The usage example follows your changes in the controls.'
            : 'Explore the component’s implementation and tests.'}
        </p>
        {view === 'source' && sources.length > 0 && (
          <div className={styles.filePicker}>
            <label htmlFor={sourceSelectId}>File</label>
            <select
              id={sourceSelectId}
              className={styles.fileSelect}
              value={selectedSource?.name}
              onChange={(event) => setSelectedSourceName(event.target.value)}
            >
              {sources.map((source) => (
                <option key={source.name} value={source.name}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {code ? (
        <CodeSnippet
          code={code}
          file={view === 'usage' ? 'Usage.tsx' : selectedSource!.name}
          label={view === 'usage' ? 'Usage example' : `Source code: ${selectedSource?.name}`}
        />
      ) : (
        <p className={styles.empty}>
          {view === 'usage' ? 'No usage example available yet.' : 'No source code available yet.'}
        </p>
      )}
    </section>
  );
}
