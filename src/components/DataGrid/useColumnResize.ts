import { useEffect, useRef, useState, type MouseEvent } from 'react';

export function useColumnResize(
  id: string | null,
  resizable: boolean,
  onResize: ((headerName: string, newWidth: number) => void) | null,
) {
  const [isResizing, setIsResizing] = useState(false);
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => () => cleanup.current?.(), []);

  function handleResizeStart(event: MouseEvent<HTMLDivElement>) {
    if (!resizable) return;
    const startX = event.clientX;
    const startWidth = event.currentTarget.parentElement?.offsetWidth || 0;
    setIsResizing(true);
    event.preventDefault();
    event.stopPropagation();

    function handleResizeMove(event: globalThis.MouseEvent) {
      const newWidth = Math.max(50, startWidth + event.clientX - startX);
      if (id) onResize?.(id, newWidth);
    }

    function handleResizeEnd() {
      setIsResizing(false);
      cleanup.current?.();
    }

    cleanup.current?.();
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    cleanup.current = () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }

  return { isResizing, handleResizeStart };
}
