import styles from './LabHeader.module.css';

export function LabHeader() {
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
        <p className={styles.signature}>by Nahuel Bordon</p>
      </div>
    </header>
  );
}
