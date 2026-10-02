import { useId, type ReactNode } from 'react';

import styles from './PropsPanel.module.css';

interface PropsPanelProps {
  children?: ReactNode;
}

export function PropsPanel({ children }: PropsPanelProps) {
  const titleId = useId();

  return (
    <section className={styles.panel} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h3 id={titleId}>Controls</h3>
        <p>Tweak the props to see how the component behaves in real time!</p>
      </header>
      <div className={styles.content}>
        {children ?? <p className={styles.empty}>No controls available.</p>}
      </div>
    </section>
  );
}
