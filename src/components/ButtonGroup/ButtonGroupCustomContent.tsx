import { ButtonGroupTile } from '../ButtonGroupTile/ButtonGroupTile';

import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupDemoOptions } from './ButtonGroupControls';

import styles from './ButtonGroupCustomContent.module.css';

export function ButtonGroupCustomContent({
  leftLabel,
  middleLabel,
  rightLabel,
  size,
  disabled,
}: ButtonGroupDemoOptions) {
  return (
    <div className={styles.examples}>
      <div>
        <ButtonGroup>
          {[1, 2, 3, 4].map((number) => (
            <ButtonGroupTile key={number} size={size} disabled={disabled}>
              <div className={styles.number}>{number}</div>
            </ButtonGroupTile>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup vertical>
          {[1, 2, 3, 4].map((number) => (
            <ButtonGroupTile key={number} vertical size={size} disabled={disabled}>
              <div className={styles.number}>{number}</div>
            </ButtonGroupTile>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup>
          <ButtonGroupTile size={size} disabled={disabled}>
            <div className={styles.label}>{leftLabel}</div>
          </ButtonGroupTile>
          <ButtonGroupTile size={size} disabled={disabled}>
            <div className={styles.label}>{middleLabel}</div>
          </ButtonGroupTile>
          <ButtonGroupTile size={size} disabled={disabled}>
            <div className={styles.label}>{rightLabel}</div>
          </ButtonGroupTile>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup>
          <ButtonGroupTile ariaLabel="Delete" size={size} disabled={disabled}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />
            </svg>
          </ButtonGroupTile>
          <ButtonGroupTile ariaLabel="Download" size={size} disabled={disabled}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6" />
            </svg>
          </ButtonGroupTile>
          <ButtonGroupTile ariaLabel="Edit" size={size} disabled={disabled}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="m16 3 5 5L8 21H3v-5L16 3Zm-3 3 5 5" />
            </svg>
          </ButtonGroupTile>
        </ButtonGroup>
      </div>
    </div>
  );
}
