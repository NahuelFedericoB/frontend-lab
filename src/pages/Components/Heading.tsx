import styles from './Heading.module.css';

interface HeadingProps {
  componentsLength: number;
}

export function Heading({ componentsLength }: HeadingProps) {
  return (
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
      <span className={styles.count}>{componentsLength} components</span>
    </div>
  );
}
