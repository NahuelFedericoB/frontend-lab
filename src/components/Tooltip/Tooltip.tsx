import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { positionTooltip } from './tooltipPosition';
import type { TooltipProps } from './Tooltip.types';

import styles from './Tooltip.module.css';

export function Tooltip({
  id = null,
  ariaLabel = null,
  class: className = '',
  target = null,
  placement = 'top',
  children,
  onshow,
  onhide,
}: TooltipProps) {
  const [display, setDisplay] = useState<{ target: HTMLElement; opacity: number } | null>(null);

  useEffect(() => {
    const element = typeof target === 'string' ? document.getElementById(target) : target;
    if (!element) return;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    function handleEnter() {
      if (timeout) {
        clearTimeout(timeout);
        setDisplay({ target: element!, opacity: 1 });
        return;
      }
      setDisplay({ target: element!, opacity: 1 });
      onshow?.();
    }

    function handleLeave() {
      clearTimeout(timeout);
      setDisplay({ target: element!, opacity: 0 });
      timeout = setTimeout(() => {
        timeout = undefined;
        setDisplay(null);
        onhide?.();
      }, 300);
    }

    element.addEventListener('mouseenter', handleEnter);
    element.addEventListener('mouseleave', handleLeave);
    return () => {
      clearTimeout(timeout);
      element.removeEventListener('mouseenter', handleEnter);
      element.removeEventListener('mouseleave', handleLeave);
    };
  }, [target, onshow, onhide]);

  if (!display) return null;

  return createPortal(
    <span
      ref={(element) => {
        if (element) positionTooltip(element, display.target, placement);
      }}
      id={id ?? undefined}
      aria-label={ariaLabel ?? undefined}
      className={[styles.tooltip, styles[`tooltip-${placement}`], className]
        .filter(Boolean)
        .join(' ')}
      style={{ opacity: display.opacity }}
      role="tooltip"
      aria-hidden={false}
    >
      {children}
    </span>,
    document.body,
  );
}
