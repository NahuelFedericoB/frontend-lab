import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { ComponentDefinition } from '../../playground';

import { ComponentsPage } from './ComponentsPage';

// These fixtures verify the explorer; they are not published library components.
function EditableDemoFixture() {
  const [value, setValue] = useState('Initial value');

  return (
    <label>
      Demo label
      <input value={value} onChange={(event) => setValue(event.target.value)} />
    </label>
  );
}

function StaticDemoFixture() {
  return <p>Second demo content</p>;
}

const components: readonly ComponentDefinition[] = [
  {
    slug: 'editable',
    name: 'Editable example',
    description: 'Editable fixture',
    category: 'Inputs',
    Demo: EditableDemoFixture,
  },
  {
    slug: 'static',
    name: 'Static example',
    description: 'Static fixture',
    category: 'Feedback',
    Demo: StaticDemoFixture,
  },
];

describe('ComponentsPage', () => {
  it('integrates Pagination with parent-controlled navigation and its own source files', async () => {
    const user = userEvent.setup();
    render(<ComponentsPage />);
    const sidebar = within(screen.getByRole('navigation', { name: 'Components' }));

    await user.click(sidebar.getByRole('button', { name: 'Pagination' }));
    const pagination = within(screen.getByRole('list', { name: 'Pagination' }));
    expect(pagination.getByRole('button', { name: 'first' })).toBeDisabled();

    await user.click(pagination.getByRole('button', { name: '3' }));
    pagination.getByRole('button', { name: 'next' }).focus();
    await user.keyboard('{Enter}');
    expect(pagination.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(pagination.queryByRole('button', { name: '3' })).not.toBeInTheDocument();

    await user.click(pagination.getByRole('button', { name: 'last' }));
    expect(pagination.getByRole('button', { name: 'next' })).toBeDisabled();
    await user.selectOptions(screen.getByRole('combobox', { name: 'Pages' }), '5');
    expect(pagination.getByRole('button', { name: 'last' })).toBeDisabled();

    await user.selectOptions(screen.getByRole('combobox', { name: 'Pages per segment' }), '0');
    const simplePagination = within(screen.getByRole('list', { name: 'Pagination' }));
    expect(simplePagination.queryByRole('button', { name: '...' })).not.toBeInTheDocument();
    expect(simplePagination.getAllByRole('button')).toHaveLength(9);

    await user.click(screen.getByRole('button', { name: 'Source' }));
    expect(
      within(screen.getByRole('combobox', { name: 'File' }))
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual([
      'Pagination.tsx',
      'Pagination.types.ts',
      'Pagination.module.css',
      'Pagination.test.tsx',
    ]);
  });

  it('integrates the DataGrid demo with parent-controlled sorting, selection, and source tests', async () => {
    const user = userEvent.setup();
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<ComponentsPage />);
    await user.click(
      within(screen.getByRole('navigation', { name: 'Components' })).getByRole('button', {
        name: 'DataGrid',
      }),
    );
    expect(screen.getAllByRole('row')[0]).toHaveTextContent('Alex Morgan');
    await user.click(screen.getByText('Name', { exact: true }));
    expect(screen.getAllByRole('row')[0]).toHaveTextContent('Taylor Kim');

    const firstRow = screen.getAllByRole('row')[0]!;
    await user.click(within(firstRow).getByRole('checkbox'));
    expect(within(firstRow).getByRole('checkbox')).toBeChecked();
    expect(alert).not.toHaveBeenCalled();
    firstRow.focus();
    await user.keyboard('{Enter}');
    expect(alert).toHaveBeenCalledWith('Selected Taylor Kim. The onRowClick action was executed.');

    await user.click(screen.getByRole('checkbox', { name: 'Loading' }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Loading' }));
    await user.click(screen.getByRole('checkbox', { name: 'Empty rows' }));
    expect(screen.getByText('No data is available')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Source' }));
    const files = within(screen.getByRole('combobox', { name: 'File' }));
    expect(files.getByRole('option', { name: 'DataGrid.test.tsx' })).toBeInTheDocument();
    expect(
      files.getByRole('option', { name: 'DataGrid.interactions.test.tsx' }),
    ).toBeInTheDocument();
  });

  it('lists Spinner independently with its controls and source files', async () => {
    const user = userEvent.setup();
    render(<ComponentsPage />);
    const sidebar = within(screen.getByRole('navigation', { name: 'Components' }));

    await user.click(sidebar.getByRole('button', { name: 'Spinner' }));
    expect(screen.getByRole('status')).toHaveAttribute('style', 'color: var(--primary);');

    await user.clear(screen.getByRole('textbox', { name: 'Color' }));
    await user.type(screen.getByRole('textbox', { name: 'Color' }), 'black');
    expect(screen.getByRole('status')).toHaveAttribute('style', 'color: black;');

    await user.click(screen.getByRole('button', { name: 'Source' }));
    expect(
      within(screen.getByRole('combobox', { name: 'File' }))
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual(['Spinner.tsx', 'Spinner.types.ts', 'Spinner.module.css', 'Spinner.test.tsx']);
  });

  it('lists Tab and Tabs separately and shows only each component’s own source files', async () => {
    const user = userEvent.setup();
    render(<ComponentsPage />);
    const sidebar = within(screen.getByRole('navigation', { name: 'Components' }));

    await user.click(sidebar.getByRole('button', { name: 'Tabs' }));
    const controls = within(screen.getByRole('region', { name: 'Controls' }));
    expect(controls.queryByRole('checkbox', { name: 'Full height' })).not.toBeInTheDocument();
    expect(controls.queryByText(/Selected tab:/)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Source' }));
    expect(
      within(screen.getByRole('combobox', { name: 'File' }))
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual(['Tabs.tsx', 'Tabs.types.ts', 'Tabs.module.css', 'Tabs.test.tsx']);

    await user.click(sidebar.getByRole('button', { name: 'Tab' }));
    await user.click(screen.getByRole('button', { name: 'Source' }));
    expect(
      within(screen.getByRole('combobox', { name: 'File' }))
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual(['Tab.tsx', 'Tab.types.ts', 'Tab.module.css', 'Tab.test.tsx']);
  });

  it('shows an honest empty library until reviewed components are registered', () => {
    render(<ComponentsPage components={[]} />);

    expect(screen.getByText('0 components')).toBeInTheDocument();
    expect(screen.getByText('No components added yet')).toBeInTheDocument();
    expect(
      within(screen.getByRole('navigation', { name: 'Components' })).queryByRole('button'),
    ).not.toBeInTheDocument();
  });

  it('selects registered demos by keyboard and resets their local state when switching', async () => {
    const user = userEvent.setup();
    render(<ComponentsPage components={components} />);

    const sidebar = screen.getByRole('navigation', { name: 'Components' });
    expect(within(sidebar).getByRole('heading', { name: 'Inputs' })).toBeInTheDocument();
    expect(within(sidebar).getByRole('heading', { name: 'Feedback' })).toBeInTheDocument();
    await user.clear(screen.getByRole('textbox', { name: 'Demo label' }));
    await user.type(screen.getByRole('textbox', { name: 'Demo label' }), 'Changed value');

    const second = within(sidebar).getByRole('button', { name: 'Static example' });
    second.focus();
    await user.keyboard('{Enter}');

    expect(second).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Second demo content')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    await user.click(within(sidebar).getByRole('button', { name: 'Editable example' }));
    expect(screen.getByRole('textbox', { name: 'Demo label' })).toHaveValue('Initial value');
  });

  it('selects the first available demo when the registry changes from empty to populated', () => {
    const { rerender } = render(<ComponentsPage components={[]} />);
    rerender(<ComponentsPage components={components} />);

    expect(screen.getByRole('button', { name: 'Editable example' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('textbox', { name: 'Demo label' })).toHaveValue('Initial value');
  });
});
