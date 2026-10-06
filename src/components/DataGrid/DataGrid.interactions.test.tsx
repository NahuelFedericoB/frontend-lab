import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { DataGrid } from './DataGrid';
import { StyledCell } from './testFixtures/StyledCell';
import headerStyles from './DataGridHeaderCell.module.css';
import cellStyles from './DataGridCell.module.css';

const headers = [{ header: 'name', label: 'Name', width: '120px' }];
const rows = [{ name: 'Alex' }, { name: 'Sam' }];
const getHeader = () => screen.getByText('Name').closest('[role="gridcell"]') as HTMLElement;

function beginResize() {
  const header = getHeader();
  Object.defineProperty(header, 'offsetWidth', { configurable: true, value: 120 });
  fireEvent.mouseDown(within(header).getByRole('separator'), { clientX: 100 });
  return header;
}

describe('DataGrid interactions', () => {
  it('resizes the header and every cell to the same width', () => {
    render(<DataGrid headers={headers} rows={rows} />);
    const header = beginResize();
    expect(header).toHaveAttribute('draggable', 'false');
    fireEvent.mouseMove(document, { clientX: 140 });

    expect(header).toHaveStyle({ minWidth: '160px', maxWidth: '160px' });
    expect(screen.getByText('Alex').closest('[role="gridcell"]')).toHaveStyle({
      minWidth: '160px',
      maxWidth: '160px',
    });
    expect(screen.getByText('Sam').closest('[role="gridcell"]')).toHaveStyle({
      minWidth: '160px',
      maxWidth: '160px',
    });

    fireEvent.mouseUp(document);
    fireEvent.mouseMove(document, { clientX: 200 });
    expect(header).toHaveStyle({ minWidth: '160px', maxWidth: '160px' });
    expect(header).toHaveAttribute('draggable', 'true');
  });

  it('keeps the original minimum resize width of 50 pixels', () => {
    render(<DataGrid headers={headers} rows={rows} />);
    const header = beginResize();
    fireEvent.mouseMove(document, { clientX: -100 });
    expect(header).toHaveStyle({ minWidth: '50px', maxWidth: '50px' });
    fireEvent.mouseUp(document);
  });

  it('removes document listeners when unmounted during a resize', () => {
    const remove = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<DataGrid headers={headers} rows={rows} />);
    beginResize();
    unmount();
    expect(remove).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(remove).toHaveBeenCalledWith('mouseup', expect.any(Function));
  });

  it('omits resize handles when resizable is false', () => {
    render(<DataGrid headers={headers} rows={rows} resizable={false} />);
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('does not reorder columns when draggable is false', () => {
    render(
      <DataGrid
        headers={[...headers, { header: 'role', label: 'Role' }]}
        rows={rows}
        draggable={false}
      />,
    );
    const header = getHeader();
    expect(header).toHaveAttribute('draggable', 'false');
    fireEvent.dragOver(header, { dataTransfer: { getData: () => 'role' } });
    expect(header).not.toHaveClass(headerStyles.dragHover!);
    fireEvent.drop(header, { dataTransfer: { getData: () => 'role' } });
    expect(screen.getAllByRole('gridcell')[0]).toHaveTextContent('Name');
  });

  it('replaces internal column widths when the parent supplies new headers', () => {
    const { rerender } = render(<DataGrid headers={headers} rows={rows} />);
    beginResize();
    fireEvent.mouseMove(document, { clientX: 140 });
    fireEvent.mouseUp(document);
    rerender(
      <DataGrid headers={[{ header: 'name', label: 'Member', minWidth: '80px' }]} rows={rows} />,
    );
    expect(screen.getByText('Member').closest('[role="gridcell"]')).toHaveStyle({
      minWidth: '80px',
      maxWidth: '',
    });
  });

  it('reports a row checkbox change without activating the row', () => {
    const onCheckboxChange = vi.fn();
    const onRowClick = vi.fn();
    render(
      <DataGrid
        headers={headers}
        rows={rows}
        showCheckbox
        onCheckboxChange={onCheckboxChange}
        onRowClick={onRowClick}
      />,
    );
    fireEvent.click(within(screen.getAllByRole('row')[0]!).getByRole('checkbox'));
    expect(onCheckboxChange).toHaveBeenCalledWith(
      { name: 'Alex', rowId: 'row_0', __checked: true },
      undefined,
    );
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('reports only visible rows when the header checkbox is checked', () => {
    const onCheckboxChange = vi.fn();
    render(
      <DataGrid
        headers={headers}
        rows={[...rows, { name: 'Hidden', hidden: true }]}
        showCheckbox
        onCheckboxChange={onCheckboxChange}
      />,
    );
    fireEvent.click(screen.getAllByRole('checkbox')[0]!);
    expect(onCheckboxChange).toHaveBeenCalledWith({ rowId: 'headerCheckbox', __checked: true }, [
      { name: 'Alex', rowId: 'row_0', __checked: true },
      { name: 'Sam', rowId: 'row_1', __checked: true },
    ]);
  });

  it('reflects partial, all, and cleared checkedRows from the parent', () => {
    const partial = [{ name: 'Alex', rowId: 'row_0', __checked: true }];
    const { rerender } = render(
      <DataGrid headers={headers} rows={rows} showCheckbox checkedRows={partial} />,
    );
    expect(screen.getAllByRole('checkbox')[0]).toBePartiallyChecked();
    expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
    expect(screen.getAllByRole('checkbox')[2]).not.toBeChecked();

    rerender(
      <DataGrid
        headers={headers}
        rows={rows}
        showCheckbox
        checkedRows={[...partial, { name: 'Sam', rowId: 'row_1', __checked: true }]}
      />,
    );
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    expect(screen.getAllByRole('checkbox')[0]).not.toBePartiallyChecked();

    rerender(<DataGrid headers={headers} rows={rows} showCheckbox checkedRows={[]} />);
    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
    expect(screen.getAllByRole('checkbox')[2]).not.toBeChecked();
  });

  it('forwards Enter on a checkbox without activating its row', () => {
    const onCheckboxChange = vi.fn();
    const onRowClick = vi.fn();
    render(
      <DataGrid
        headers={headers}
        rows={rows}
        showCheckbox
        onCheckboxChange={onCheckboxChange}
        onRowClick={onRowClick}
      />,
    );
    fireEvent.keyDown(within(screen.getAllByRole('row')[0]!).getByRole('checkbox'), {
      key: 'Enter',
    });
    expect(onCheckboxChange).toHaveBeenCalledWith(
      { name: 'Alex', rowId: 'row_0', __checked: false },
      undefined,
    );
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('forwards Space on a checkbox without activating its row', () => {
    const onCheckboxChange = vi.fn();
    const onRowClick = vi.fn();
    render(
      <DataGrid
        headers={headers}
        rows={rows}
        showCheckbox
        onCheckboxChange={onCheckboxChange}
        onRowClick={onRowClick}
      />,
    );
    fireEvent.keyDown(within(screen.getAllByRole('row')[0]!).getByRole('checkbox'), { key: ' ' });
    expect(onCheckboxChange).toHaveBeenCalledWith(
      { name: 'Alex', rowId: 'row_0', __checked: false },
      undefined,
    );
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('lets a custom cell change container styles through the approved callback', () => {
    render(<DataGrid headers={[{ ...headers[0]!, component: StyledCell }]} rows={rows} />);
    const cell = screen.getByText('Alex').closest('[role="gridcell"]');
    expect(cell).toHaveStyle(
      'background-color: rgb(173, 216, 230); padding-left: 8px; width: 120px;',
    );
    expect(screen.getByText('Alex')).toHaveAttribute('id', 'row_0_cell_0_content');
  });

  it('renders custom empty content through noDataMessage', () => {
    render(
      <DataGrid
        headers={headers}
        rows={[]}
        noDataMessage={<strong>No team members yet.</strong>}
      />,
    );
    expect(screen.getByText('No team members yet.').tagName).toBe('STRONG');
  });

  it('positions loading content in the visible area of an overflowing grid', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
      this: HTMLElement,
    ) {
      return this.getAttribute('aria-label') === 'Wide grid' ? 900 : 300;
    });
    render(
      <div style={{ overflow: 'auto' }}>
        <DataGrid ariaLabel="Wide grid" headers={headers} rows={rows} loading gridOverflow />
      </div>,
    );
    const wrapper = screen.getByRole('status').parentElement?.parentElement;
    expect(wrapper).toHaveStyle({
      position: 'relative',
      width: '300px',
      height: '100%',
      left: '0px',
    });
  });

  it('marks only the last visible cell when a trailing column is hidden', () => {
    render(
      <DataGrid
        headers={[...headers, { header: 'role', label: 'Role', hidden: true }]}
        rows={rows}
        hideDivisors
      />,
    );
    const cell = screen.getByText('Alex').closest('[role="gridcell"]');
    expect(cell).toHaveClass(cellStyles.isLast!, cellStyles.hideDivisors!);
  });
});
