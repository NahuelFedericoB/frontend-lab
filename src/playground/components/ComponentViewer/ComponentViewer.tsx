import { useId, type ReactNode } from 'react';
import type { SourceFile } from '../../types';
import { CodeViewer } from '../CodeViewer/CodeViewer';
import { PropsPanel } from '../PropsPanel/PropsPanel';
import styles from './ComponentViewer.module.css';

interface ComponentViewerProps {
  preview: ReactNode;
  controls?: ReactNode;
  usage: string;
  sources: readonly SourceFile[];
}

export function ComponentViewer({ preview, controls, usage, sources }: ComponentViewerProps) {
  const titleId = useId();

  return (
    <div className={styles.viewer}>
      <div className={styles.workspace}>
        <section className={styles.previewPanel} aria-labelledby={titleId}>
          <header className={styles.header}>
            <h3 id={titleId}>Preview</h3>
          </header>
          <div className={styles.preview}>{preview}</div>
        </section>
        <PropsPanel>{controls}</PropsPanel>
      </div>
      <CodeViewer usage={usage} sources={sources} />
    </div>
  );
}
