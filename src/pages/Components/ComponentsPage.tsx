import { useState } from 'react';
import { ComponentViewer, componentRegistry } from '../../playground';
import type { ComponentDefinition } from '../../playground';
import { ComponentList } from './ComponentList';
import styles from './ComponentsPage.module.css';

interface ComponentsPageProps {
  components?: readonly ComponentDefinition[];
}

export function ComponentsPage({ components = componentRegistry }: ComponentsPageProps) {
  const [selectedSlug, setSelectedSlug] = useState(components[0]?.slug ?? '');
  const selected = components.find((component) => component.slug === selectedSlug) ?? components[0];
  const Demo = selected?.Demo;

  return (
    <>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            FRONTEND LAB
          </p>
          <h1>Component library</h1>
          <p className={styles.description}>
            A sample of how I think, design, and test components when building a design system.
          </p>
        </div>
        <span className={styles.count}>
          {components.length} {components.length === 1 ? 'component' : 'components'}
        </span>
      </div>

      <div className={styles.workspace}>
        <ComponentList
          components={components}
          selectedSlug={selected?.slug ?? ''}
          onSelect={setSelectedSlug}
        />
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
      </div>
    </>
  );
}
