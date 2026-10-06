import { useEffect, useRef } from 'react';
import { LabHeader } from './layout/LabHeader/LabHeader';
import { ComponentsPage } from './pages/Components/ComponentsPage';
import styles from './App.module.css';

interface AppProps {
  embedded?: boolean;
}

export default function App({ embedded = false }: AppProps) {
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!embedded || !contentRef.current || window.parent === window) {
      return;
    }

    const content = contentRef.current;
    const reportHeight = () => {
      window.parent.postMessage(
        { type: 'frontend-lab:resize', height: Math.ceil(content.getBoundingClientRect().height) },
        window.location.origin,
      );
    };
    const observer = new ResizeObserver(reportHeight);
    observer.observe(content);
    reportHeight();

    return () => observer.disconnect();
  }, [embedded]);

  return (
    <>
      {!embedded && <LabHeader />}
      <main
        ref={contentRef}
        id="main"
        tabIndex={-1}
        className={embedded ? styles.embedded : styles.main}
      >
        {embedded && <h1 className={styles.srOnly}>Frontend Lab component library</h1>}
        <ComponentsPage embedded={embedded} />
      </main>
      {!embedded && (
        <footer className={styles.footer}>
          <span>Nahuel Bordon · Front-End Engineer</span>
        </footer>
      )}
    </>
  );
}
