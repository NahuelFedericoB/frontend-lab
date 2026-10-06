import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

afterEach(() => vi.unstubAllGlobals());

describe('Lab integration', () => {
  it('keeps the full page and an explicit return link in standalone mode', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Component library' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Back to portfolio' }).getAttribute('href')).toMatch(
      /\/#frontend-lab$/,
    );
    expect(screen.getByRole('contentinfo')).toBeVisible();
  });

  it('keeps the explorer in embed mode without the standalone header and footer', () => {
    render(<App embedded />);

    expect(screen.getByRole('navigation', { name: 'Components' })).toBeVisible();
    expect(screen.getByRole('region', { name: 'Component explorer' })).toBeVisible();
    expect(screen.queryByRole('link', { name: 'Back to portfolio' })).not.toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('reports content height changes to its own origin and disconnects on unmount', () => {
    const postMessage = vi.fn();
    const disconnect = vi.fn();
    const observe = vi.fn();
    let reportResize: () => void = () => {};
    vi.stubGlobal('parent', { postMessage });
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          reportResize = callback;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
    const bounds = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
    bounds.mockReturnValue({ height: 900 } as DOMRect);
    const { unmount } = render(<App embedded />);

    expect(observe).toHaveBeenCalledWith(screen.getByRole('main'));
    expect(postMessage).toHaveBeenLastCalledWith(
      { type: 'frontend-lab:resize', height: 900 },
      window.location.origin,
    );

    bounds.mockReturnValue({ height: 1200.5 } as DOMRect);
    act(() => reportResize());
    expect(postMessage).toHaveBeenLastCalledWith(
      { type: 'frontend-lab:resize', height: 1201 },
      window.location.origin,
    );

    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
