import type { ComponentDefinition } from '../../playground';
import styles from './ComponentList.module.css';

interface ComponentListProps {
  components: readonly ComponentDefinition[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}

export function ComponentList({ components, selectedSlug, onSelect }: ComponentListProps) {
  const categories = [...new Set(components.map((component) => component.category))];

  return (
    <nav className={styles.sidebar} aria-label="Components">
      <h2 className={styles.title}>Components</h2>
      {components.length === 0 ? (
        <p className={styles.empty}>The component list will appear here.</p>
      ) : (
        categories.map((category) => (
          <div className={styles.group} key={category}>
            <h3>{category}</h3>
            <ul className={styles.list}>
              {components
                .filter((component) => component.category === category)
                .map((component) => (
                  <li key={component.slug}>
                    <button
                      type="button"
                      className={styles.item}
                      aria-pressed={selectedSlug === component.slug}
                      onClick={() => onSelect(component.slug)}
                    >
                      <span>{component.name}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))
      )}
    </nav>
  );
}
