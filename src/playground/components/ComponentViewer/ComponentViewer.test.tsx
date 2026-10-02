import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ComponentViewer } from './ComponentViewer';

// This fixture exercises the viewer contract; it is not a library component or registry entry.
function DemoFixture() {
  const [label, setLabel] = useState('Save');
  const [color, setColor] = useState('#74acdf');

  return (
    <ComponentViewer
      preview={
        <button type="button" style={{ backgroundColor: color }}>
          {label}
        </button>
      }
      controls={
        <>
          <label>
            Label
            <input value={label} onChange={(event) => setLabel(event.target.value)} />
          </label>
          <label>
            Color
            <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          </label>
        </>
      }
      usage={`<Example label=${JSON.stringify(label)} color=${JSON.stringify(color)} />`}
      sources={[{ name: 'Example.tsx', code: 'export const componentSource = "unchanged";' }]}
    />
  );
}

describe('ComponentViewer', () => {
  it('keeps preview and usage synchronized with demo-owned controls while preserving source files', () => {
    render(<DemoFixture />);

    fireEvent.change(screen.getByLabelText('Label'), { target: { value: 'Continue' } });
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '#f6b900' } });

    expect(screen.getByRole('button', { name: 'Continue' })).toHaveStyle({
      backgroundColor: '#f6b900',
    });
    expect(screen.getByLabelText('Usage example')).toHaveTextContent(
      '<Example label="Continue" color="#f6b900" />',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Source' }));
    fireEvent.change(screen.getByLabelText('Label'), { target: { value: 'Done' } });
    expect(screen.getByLabelText('Source code: Example.tsx')).toHaveTextContent(
      'export const componentSource = "unchanged";',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Usage' }));
    expect(screen.getByLabelText('Usage example')).toHaveTextContent(
      '<Example label="Done" color="#f6b900" />',
    );
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });

  it('supports a component with no editable properties', () => {
    render(
      <ComponentViewer preview={<span>Static preview</span>} usage="<Example />" sources={[]} />,
    );

    expect(screen.getByRole('region', { name: 'Preview' })).toHaveTextContent('Static preview');
    expect(screen.getByRole('region', { name: 'Controls' })).toHaveTextContent(
      'No controls available.',
    );
  });
});
