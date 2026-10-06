import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Tooltip } from './Tooltip';

function renderTooltip(props = {}) {
  return render(
    <>
      <button id="target" style={{ padding: 0 }}>
        Target
      </button>
      <Tooltip target="target" {...props}>
        Drag to reorder columns
      </Tooltip>
    </>,
  );
}

afterEach(() => vi.useRealTimers());

describe('Tooltip', () => {
  it('shows its content on hover and hides it after the original 300ms delay', () => {
    vi.useFakeTimers();
    const onshow = vi.fn();
    const onhide = vi.fn();
    renderTooltip({ onshow, onhide });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Drag to reorder columns');
    expect(screen.getByRole('tooltip').parentElement).toBe(document.body);
    expect(onshow).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toHaveStyle({ opacity: '0' });
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(onhide).toHaveBeenCalledTimes(1);
  });

  it('keeps the tooltip visible when the pointer returns before the timeout', () => {
    vi.useFakeTimers();
    const onshow = vi.fn();
    renderTooltip({ onshow });
    fireEvent.mouseEnter(screen.getByRole('button'));
    fireEvent.mouseLeave(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(150));
    fireEvent.mouseEnter(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole('tooltip')).toHaveStyle({ opacity: '1' });
    expect(onshow).toHaveBeenCalledTimes(1);
  });

  it('removes the portal and pending timeout on unmount', () => {
    vi.useFakeTimers();
    const onhide = vi.fn();
    const { unmount } = renderTooltip({ onhide });
    fireEvent.mouseEnter(screen.getByRole('button'));
    fireEvent.mouseLeave(screen.getByRole('button'));
    unmount();
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(onhide).not.toHaveBeenCalled();
  });
});
