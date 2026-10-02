import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CodeViewer } from './CodeViewer';

const sources = [
  { name: 'Example.tsx', code: 'export function Example() { return <button>Save</button>; }' },
  { name: 'Example.module.css', code: '.button { color: blue; }' },
] as const;

describe('CodeViewer', () => {
  it('shows the requested source file and preserves the usage example independently', () => {
    render(<CodeViewer usage={'<Example label="Save" />'} sources={sources} />);

    expect(screen.getByLabelText('Usage example')).toHaveTextContent('<Example label="Save" />');
    fireEvent.click(screen.getByRole('button', { name: 'Source' }));
    expect(screen.getByLabelText('Source code: Example.tsx')).toHaveTextContent(sources[0].code);

    fireEvent.change(screen.getByRole('combobox', { name: 'File' }), {
      target: { value: 'Example.module.css' },
    });
    expect(screen.getByLabelText('Source code: Example.module.css')).toHaveTextContent(
      sources[1].code,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Usage' }));
    expect(screen.getByLabelText('Usage example')).toHaveTextContent('<Example label="Save" />');
    expect(screen.getByRole('button', { name: 'Usage' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Source' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders source markup as literal text', () => {
    const code = '<script>alert("example")</script>\n<button>Not an interactive control</button>';
    const { container } = render(<CodeViewer usage="" sources={[{ name: 'Markup.tsx', code }]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Source' }));

    expect(screen.getByLabelText('Source code: Markup.tsx').textContent).toBe(code);
    expect(container.querySelector('script')).toBeNull();
    expect(
      screen.queryByRole('button', { name: 'Not an interactive control' }),
    ).not.toBeInTheDocument();
  });

  it('falls back to the first current file when the previously selected source disappears', () => {
    const { rerender } = render(<CodeViewer usage="" sources={sources} />);
    fireEvent.click(screen.getByRole('button', { name: 'Source' }));
    fireEvent.change(screen.getByRole('combobox', { name: 'File' }), {
      target: { value: 'Example.module.css' },
    });

    rerender(
      <CodeViewer usage="" sources={[{ name: 'Other.tsx', code: 'export const other = 1;' }]} />,
    );

    expect(screen.getByRole('combobox', { name: 'File' })).toHaveValue('Other.tsx');
    expect(screen.getByLabelText('Source code: Other.tsx')).toHaveTextContent(
      'export const other = 1;',
    );
  });

  it('handles an empty catalog without presenting a source selector', () => {
    render(<CodeViewer usage="" sources={[]} />);

    expect(screen.getByText('No usage example available yet.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Source' }));
    expect(screen.getByText('No source code available yet.')).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
