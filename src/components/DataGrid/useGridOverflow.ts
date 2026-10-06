import { useLayoutEffect, useRef } from 'react';

import getScrollLeft from '../../utils/getScrollLeft';

export function useGridOverflow(gridOverflow: boolean, loading: boolean) {
  const gridRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const position = useRef({ width: '100%', left: '0px' });

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if ((grid && gridOverflow) || loading) {
      const parentWidth = grid?.parentElement?.offsetWidth || 0;
      if (parentWidth < (grid?.offsetWidth || 0)) {
        position.current = { width: `${parentWidth}px`, left: `${getScrollLeft(grid)}px` };
      }
    }

    if (messageRef.current) {
      messageRef.current.style.cssText = gridOverflow
        ? `position: relative; width: ${position.current.width}; height: 100%; left: ${position.current.left}`
        : '';
    }
  });

  return { gridRef, messageRef };
}
