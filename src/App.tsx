import { LabHeader } from './layout/LabHeader/LabHeader';
import { ComponentsPage } from './pages/Components/ComponentsPage';
import styles from './App.module.css';

export default function App() {
  return (
    <>
      <LabHeader />
      <main id="main" tabIndex={-1} className={styles.main}>
        <ComponentsPage />
      </main>
      <footer className={styles.footer}>
        <span>Nahuel Bordon · Front-End Engineer</span>
      </footer>
    </>
  );
}
