import { useState } from 'react';

import { componentRegistry } from '../../playground';
import type { ComponentDefinition } from '../../playground';

import { Heading } from './Heading';
import { ComponentList } from './ComponentList';
import { ComponentExplorer } from './ComponentExporer';

import styles from './ComponentsPage.module.css';

interface ComponentsPageProps {
  components?: readonly ComponentDefinition[];
  embedded?: boolean;
}

export function ComponentsPage({
  components = componentRegistry,
  embedded = false,
}: ComponentsPageProps) {
  const [selectedSlug, setSelectedSlug] = useState(components[0]?.slug ?? '');
  const selected = components.find((component) => component.slug === selectedSlug) ?? components[0];

  return (
    <>
      {!embedded && <Heading componentsLength={components.length} />}
      <div className={styles.workspace}>
        <ComponentList
          components={components}
          selectedSlug={selected?.slug ?? ''}
          onSelect={setSelectedSlug}
        />
        <ComponentExplorer selected={selected} />
      </div>
    </>
  );
}
