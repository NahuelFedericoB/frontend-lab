import { ComponentViewer } from '../../playground';
import type { ComponentDefinition } from '../../playground';

import styles from './ComponentExplorer.module.css';

interface ComponentExplorerProps {
  selected: ComponentDefinition | undefined;
}

export function ComponentExplorer({ selected }: ComponentExplorerProps) {
  const Demo = selected?.Demo;

  return (
    <section className={styles.viewer} aria-label="Component explorer">
      {selected && Demo ? (
        <>
          <div className={styles.componentHeading}>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
          </div>
          <Demo key={selected.slug} />
        </>
      ) : (
        <>
          <h2 className={styles.srOnly}>Component explorer</h2>
          <ComponentViewer
            preview={
              <div className={styles.emptyPreview}>
                <span className={styles.emptyIcon} aria-hidden="true">
                  {'</>'}
                </span>
                <p className={styles.emptyTitle}>No components added yet</p>
                <p>The collection is taking shape. Interactive previews will appear here.</p>
              </div>
            }
            controls={
              <p className={styles.emptyControls}>
                Choose a component to explore its available properties.
              </p>
            }
            usage=""
            sources={[]}
          />
        </>
      )}
    </section>
  );
}
