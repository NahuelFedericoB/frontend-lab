import styles from './LabHeader.module.css';

export function LabHeader() {
  const portfolioUrl = import.meta.env.DEV
    ? 'http://127.0.0.1:5173/#frontend-lab'
    : '/#frontend-lab';

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <a className={styles.brand} href="./" aria-label="Frontend Lab home">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width="28" height="28" />
          <span className={styles.initials}>NB</span>
          <span className={styles.separator} aria-hidden="true">
            /
          </span>
          <span>Frontend Lab</span>
        </a>
        <a className={styles.backLink} href={portfolioUrl}>
          <span aria-hidden="true">←</span> Back to portfolio
        </a>
      </div>
    </header>
  );
}
