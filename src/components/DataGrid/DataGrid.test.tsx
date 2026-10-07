import { render, fireEvent, screen, createEvent, act } from '@testing-library/react';

import { describe, it, expect, vi } from 'vitest';
import { DataGrid } from './DataGrid';
import type { DataGridProps, GridRow } from './DataGrid.types';
import rowStyles from './DataGridRow.module.css';
import cellStyles from './DataGridCell.module.css';
import headerStyles from './DataGridHeader.module.css';
import headerCellStyles from './DataGridHeaderCell.module.css';

import { RenderLink } from './testFixtures/RenderLink';

const headersMock = [
  { header: 'id', label: 'Id' },
  { header: 'name', label: 'Name' },
  { header: 'status', label: 'Status' },
];

const rowsMock = [
  { id: 5, name: 'Jack', status: 'active' },
  { id: 4, name: 'Zed', status: 'active' },
  { id: 2, name: 'Jane', status: 'inactive' },
  { id: 3, name: 'Mike', status: 'active' },
  { id: 1, name: 'Arnold', status: 'inactive' },
  { id: 6, name: 'Arnold', status: 'active' },
];

const renderWithData = (props: DataGridProps = {}) =>
  render(<DataGrid headers={headersMock} rows={rowsMock} {...props} />);

describe('<DataGrid />', () => {
  it('should render correctly', () => {
    const { container } = renderWithData();

    expect(container).toMatchSnapshot();
  });

  describe('when data is passed', () => {
    describe('and there is a undefined value', () => {
      it('should render without breaking', () => {
        const { container } = renderWithData({
          rows: [
            {
              id: undefined,
            },
            {
              id: undefined,
            },
          ],
          headers: [
            {
              header: 'id',
              label: 'Id',
            },
          ],
        });

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('when valid `headers` and `rows` are defined', () => {
    it('should render correctly', () => {
      const { container } = renderWithData();

      expect(container).toMatchSnapshot();
    });

    it('should accept Components as formatters', () => {
      const headersMock = [
        { header: 'id', label: 'Id', component: RenderLink },
        { header: 'name', label: 'Name' },
        { header: 'status', label: 'Status' },
      ];
      const mockedRows = [
        { id: 5, name: 'Jack', status: 'active' },
        { id: 4, name: 'Zed', status: 'active' },
        { id: 2, name: 'Jane', status: 'inactive' },
        { id: 3, name: 'Mike', status: 'active' },
        { id: 1, name: 'Arnold', status: 'inactive' },
        { id: 6, name: 'Arnold', status: 'active' },
      ];
      const { container } = renderWithData({ headers: headersMock, rows: mockedRows });

      expect(container).toMatchSnapshot();
    });

    describe('when a row has the property `hidden` set to `true`', () => {
      it('should hide the row', () => {
        const headersMock = [
          { header: 'id', label: 'Id', component: RenderLink },
          { header: 'name', label: 'Name' },
          { header: 'status', label: 'Status' },
        ];
        const mockedRows = [
          { id: 1, name: 'Jack', status: 'active' },
          { id: 2, name: 'Zed', status: 'active', hidden: true },
        ];
        renderWithData({ headers: headersMock, rows: mockedRows });

        expect(screen.getByText(mockedRows[1]!.name).closest(`.${rowStyles.row}`)!).toHaveClass(
          rowStyles.hideRow!,
        );
      });

      describe('when all the rows are hidden', () => {
        it('should render the no data message', () => {
          const headersMock = [
            { header: 'id', label: 'Id', component: RenderLink },
            { header: 'name', label: 'Name' },
            { header: 'status', label: 'Status' },
          ];
          const mockedRows = [
            { id: 1, name: 'Jack', status: 'active', hidden: true },
            { id: 2, name: 'Zed', status: 'active', hidden: true },
          ];
          renderWithData({ headers: headersMock, rows: mockedRows });

          expect(screen.getByText('No data is available')).toBeInTheDocument();
        });
      });
    });
  });

  describe('when a `formatter` is passed in the header definitions', () => {
    it('should call the `formatter` with the row `values` and `cell id`', () => {
      const formatterMock = vi.fn();
      const headers = [
        { header: 'id', label: 'Id' },
        { header: 'name', label: 'Name', formatter: formatterMock },
        { header: 'status', label: 'Status' },
      ];
      renderWithData({ headers: headers, rows: rowsMock });

      expect(formatterMock).toHaveBeenCalledWith(
        {
          id: 5,
          name: 'Jack',
          status: 'active',
        },
        'row_0_cell_1',
      );
      expect(formatterMock).toHaveBeenCalledWith(
        {
          id: 4,
          name: 'Zed',
          status: 'active',
        },
        'row_1_cell_1',
      );
      expect(formatterMock).toHaveBeenCalledWith(
        {
          id: 2,
          name: 'Jane',
          status: 'inactive',
        },
        'row_2_cell_1',
      );
      expect(formatterMock).toHaveBeenCalledWith(
        {
          id: 3,
          name: 'Mike',
          status: 'active',
        },
        'row_3_cell_1',
      );
      expect(formatterMock).toHaveBeenCalledWith(
        {
          id: 1,
          name: 'Arnold',
          status: 'inactive',
        },
        'row_4_cell_1',
      );
      expect(formatterMock).toHaveBeenCalledWith(
        {
          id: 6,
          name: 'Arnold',
          status: 'active',
        },
        'row_5_cell_1',
      );
    });
  });

  describe('when an array is passed in as a row value', () => {
    it('should call the `formatter` with the array', () => {
      const rowsMock = [
        {
          id: 5,
          name: 'Jack',
          status: 'active',
          phones: [{ use: 'mobile', value: '11111111' }],
        },
        { id: 4, name: 'Zed', status: 'active', phones: [] },
      ];
      const formatterMock = vi.fn();
      const headers = [
        { header: 'id', label: 'Id' },
        { header: 'name', label: 'Name' },
        { header: 'status', label: 'Status' },
        { header: 'phones', label: 'Phones', formatter: formatterMock },
      ];
      renderWithData({ headers: headers, rows: rowsMock });

      expect(formatterMock).toHaveBeenCalledWith(
        {
          id: 5,
          name: 'Jack',
          status: 'active',
          phones: [
            {
              use: 'mobile',
              value: '11111111',
            },
          ],
        },
        'row_0_cell_3',
      );
    });

    it('should render the value based on the formatter return value', () => {
      const formatName = ({ name }: GridRow) => `__${name}__`;
      const headers = [{ header: 'name', label: 'Name', formatter: formatName }];
      const rows = [{ name: 'Jack' }];
      renderWithData({ headers: headers, rows });

      expect(screen.queryByText('__Jack__')).toBeInTheDocument();
    });
  });

  describe('when the `onColumnClick prop is provided`', () => {
    describe('and one of the grid colum is clicked', () => {
      it('should call the passed function with the column header id and the actual sort direction', async () => {
        const onColumnClick = vi.fn();
        renderWithData({ onColumnClick });
        const nameColumn = screen.getByText('Name');

        fireEvent.click(nameColumn);

        expect(onColumnClick).toHaveBeenCalledWith({
          direction: null,
          headerName: 'name',
        });
      });
    });

    it('should accept the `Enter` key', () => {
      const onColumnClick = vi.fn();
      renderWithData({ onColumnClick });
      const nameColumn = screen.getByText('Name');

      fireEvent.keyDown(nameColumn, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(onColumnClick).toHaveBeenCalledWith({
        direction: null,
        headerName: 'name',
      });
    });

    it('should accept the `Spacebar` key', () => {
      const onColumnClick = vi.fn();
      renderWithData({ onColumnClick });
      const nameColumn = screen.getByText('Name');

      fireEvent.keyDown(nameColumn, { key: ' ', code: ' ', charCode: 32 });

      expect(onColumnClick).toHaveBeenCalledWith({
        direction: null,
        headerName: 'name',
      });
    });

    it('should ignore any other key', () => {
      const onColumnClick = vi.fn();
      renderWithData({ onColumnClick });
      const nameColumn = screen.getByText('Name');

      fireEvent.keyDown(nameColumn, { key: 'a', code: 'KeyA', charCode: 97 });

      expect(onColumnClick).not.toHaveBeenCalledWith({
        direction: null,
        headerName: 'name',
      });
    });
  });

  describe('when the `onColumnClick prop is NOT provided`', () => {
    describe('and one of the grid colum is clicked', () => {
      it('should NOT call the passed function with the column header id and the actual sort direction', async () => {
        const onColumnClick = vi.fn();
        renderWithData();
        const nameColumn = screen.getByText('Name');

        fireEvent.click(nameColumn);

        expect(onColumnClick).not.toHaveBeenCalledWith({
          direction: null,
          headerName: 'name',
        });
      });
    });
  });

  describe('when the `hidden` key is set on the Headers Array', () => {
    it('should hide the cells of the specified column', () => {
      const mockedHeaders = [
        { header: 'id', label: 'Id' },
        { header: 'name', label: 'Name', hidden: true },
      ];
      const rowsMock = [
        { id: 1, name: 'Jack' },
        { id: 2, name: 'Zed' },
      ];
      renderWithData({
        headers: mockedHeaders,
        rows: rowsMock,
      });
      const cell = screen.getByText('Zed').closest(`.${cellStyles.cell}`)!;

      expect(cell).toHaveClass(cellStyles.hideCell!);
    });
  });

  describe('the `activeRow` prop', () => {
    describe('when a row is is set', () => {
      it('should set the row as `active`', () => {
        const getRow = () => screen.getByText('Jane').closest(`.${rowStyles.row}`)!;
        renderWithData({
          activeRow: 'row_2',
        });
        const row = getRow();

        expect(row).toHaveClass(rowStyles.active!);
      });
    });
  });

  describe('when the `onRowClick` prop is provided', () => {
    describe('and the user clicks a row', () => {
      it('should call the passed function with the row data and the row id', () => {
        const onRowClickMock = vi.fn();
        renderWithData({ onRowClick: onRowClickMock });
        const row = screen.getByText('Zed').closest(`.${rowStyles.row}`)!;

        fireEvent.click(row);

        expect(onRowClickMock).toHaveBeenCalledWith(
          {
            id: 4,
            name: 'Zed',
            status: 'active',
          },
          'row_1',
        );
      });
    });

    it('should accept the `Enter` key', () => {
      const onRowClickMock = vi.fn();
      renderWithData({ onRowClick: onRowClickMock });
      const row = screen.getByText('Zed').closest(`.${rowStyles.row}`)!;

      fireEvent.keyDown(row, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(onRowClickMock).toHaveBeenCalledWith(
        {
          id: 4,
          name: 'Zed',
          status: 'active',
        },
        'row_1',
      );
    });

    it('should accept the `Spacebar` key', () => {
      const onRowClickMock = vi.fn();
      renderWithData({ onRowClick: onRowClickMock });
      const row = screen.getByText('Zed').closest(`.${rowStyles.row}`)!;

      fireEvent.keyDown(row, { key: ' ', code: ' ', charCode: 32 });

      expect(onRowClickMock).toHaveBeenCalledWith(
        {
          id: 4,
          name: 'Zed',
          status: 'active',
        },
        'row_1',
      );
    });

    it('should ignore any other key', () => {
      const onRowClickMock = vi.fn();
      renderWithData({ onRowClick: onRowClickMock });
      const row = screen.getByText('Zed').closest(`.${rowStyles.row}`)!;

      fireEvent.keyDown(row, { key: 'a', code: 'KeyA', charCode: 97 });

      expect(onRowClickMock).not.toHaveBeenCalledWith(
        {
          id: 4,
          name: 'Zed',
          status: 'active',
        },
        'row_1',
      );
    });
  });

  describe('when the `onRowClick` prop is NOT provided', () => {
    describe('and the user clicks a row', () => {
      it('should NOT call the passed function with the row data and the row id', () => {
        const onRowClickMock = vi.fn();
        renderWithData();
        const row = screen.getByText('Zed').closest(`.${rowStyles.row}`)!;

        fireEvent.click(row);

        expect(onRowClickMock).not.toHaveBeenCalledWith(
          {
            id: 4,
            name: 'Zed',
            status: 'active',
          },
          'row_1',
        );
      });
    });
  });

  describe('`sortByColumn` and `sortDirection` props', () => {
    describe('when `sortByColumn` has a valid name and `sortDirection` is `down`', () => {
      it('should render the sort down icon', async () => {
        renderWithData({ sortByColumn: 'name', sortDirection: 'down' });
        const icon = screen
          .getByText('Name')
          .closest(`.${headerCellStyles.headerCellContent}`)!
          .querySelector('i');

        expect(icon).toHaveAttribute('aria-label', 'sort icon down');
      });
    });
  });

  describe('and `sortByColumn` has a valid name and `sortDirection` is `up`', () => {
    it('should render the sort up icon', async () => {
      renderWithData({ sortByColumn: 'name', sortDirection: 'up' });
      const icon = screen
        .getByText('Name')
        .closest(`.${headerCellStyles.headerCellContent}`)!
        .querySelector('i');

      expect(icon).toHaveAttribute('aria-label', 'sort icon up');
    });
  });

  describe('when `sortByColumn` and `sortDirection` are NOT defined', () => {
    it('should NOT render the sort icon', () => {
      renderWithData({ sortByColumn: 'noExistentColumn', sortDirection: null });

      expect(screen.queryByLabelText('sort icon up')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('sort icon down')).not.toBeInTheDocument();
    });
  });

  describe('when the `loading` prop is passed', () => {
    it('should show a loading indicator', () => {
      renderWithData({ loading: true });

      expect(screen.queryAllByText('Loading...')[0]).toBeInTheDocument();
    });

    describe('and the `loadingMessage` is set', () => {
      it('should show the message in the screen', () => {
        renderWithData({ loading: true, loadingMessage: 'Test...' });

        expect(screen.queryAllByText('Test...')[0]).toBeInTheDocument();
      });
    });
  });

  describe('when the `noDataMessage` is set', () => {
    it('should render the message on the Grid', () => {
      renderWithData({
        noDataMessage: 'Test Message',
        rows: [],
      });

      expect(screen.queryByText('Test Message')).toBeInTheDocument();
    });
  });

  describe('when the `stickyHeader` prop is set to true', () => {
    it('should assign the correct className', () => {
      renderWithData({ stickyHeader: true });
      const tableHeader = screen.getByText('Name').closest(`.${headerStyles.header}`)!;

      expect(tableHeader).toHaveClass(headerStyles.stickyHeader!);
    });
  });

  describe('when the draggable prop is passed', () => {
    describe('when a column is dragged', () => {
      describe('the target column', () => {
        it('should highlight the row when the user drags over', () => {
          const getNameColumn = () => screen.getByText('Name');
          const getStatusColumn = () => screen.getByText('Status');
          renderWithData({ draggable: true });
          const nameColumn = getNameColumn();
          const statusColumn = getStatusColumn();
          const dragStartEvent = createEvent.dragStart(nameColumn);
          const dragOverEvent = createEvent.dragOver(nameColumn);

          Object.defineProperty(dragStartEvent, 'dataTransfer', {
            value: {
              getData: vi.fn(),
              setData: vi.fn(),
            },
          });
          Object.defineProperty(dragOverEvent, 'dataTransfer', {
            value: {
              getData: vi.fn(),
              setData: vi.fn(),
            },
          });
          fireEvent(nameColumn, dragStartEvent);
          fireEvent(statusColumn, dragOverEvent);

          expect(statusColumn.closest(`.${headerCellStyles.headerCell}`)!).toHaveClass(
            headerCellStyles.dragHover!,
          );
        });
      });

      describe('when the drag leaves a column', () => {
        it('should remove the hover color', () => {
          const getNameColumn = () => screen.getByText('Name');
          const getStatusColumn = () => screen.getByText('Status');
          renderWithData({ draggable: true });
          const nameColumn = getNameColumn();
          const statusColumn = getStatusColumn();
          const dragStartEvent = createEvent.dragStart(nameColumn);
          const dragOverEvent = createEvent.dragOver(nameColumn);
          const dragLeaveEvent = createEvent.dragLeave(nameColumn);

          Object.defineProperty(dragStartEvent, 'dataTransfer', {
            value: {
              getData: vi.fn(),
              setData: vi.fn(),
            },
          });
          Object.defineProperty(dragOverEvent, 'dataTransfer', {
            value: {
              getData: vi.fn(),
              setData: vi.fn(),
            },
          });
          Object.defineProperty(dragLeaveEvent, 'dataTransfer', {
            value: {
              getData: vi.fn(),
              setData: vi.fn(),
            },
          });
          fireEvent(nameColumn, dragStartEvent);
          fireEvent(statusColumn, dragOverEvent);
          expect(statusColumn.closest(`.${headerCellStyles.headerCell}`)!).toHaveClass(
            headerCellStyles.dragHover!,
          );

          fireEvent(statusColumn, dragLeaveEvent);

          expect(statusColumn.closest(`.${headerCellStyles.headerCell}`)!).not.toHaveClass(
            headerCellStyles.dragHover!,
          );
        });
      });
    });

    describe('and is dropped in other column', () => {
      it('should swap the columns positions', async () => {
        const getNameColumn = () => screen.getByText('Name');
        const getStatusColumn = () => screen.getByText('Status');
        const getTableHeaders = () =>
          container.querySelectorAll(`.${headerStyles.header} > .${headerCellStyles.headerCell}`);
        const { container } = renderWithData({ draggable: true });
        const nameColumn = getNameColumn();
        const statusColumn = getStatusColumn();
        const dragStartEvent = createEvent.dragStart(nameColumn);
        const dragOverEvent = createEvent.dragOver(nameColumn);
        const dragLeaveEvent = createEvent.dragLeave(nameColumn);
        const dropEvent = createEvent.drop(statusColumn);
        const tableHeaders = getTableHeaders();

        expect(tableHeaders[0]).toHaveTextContent('Id');
        expect(tableHeaders[1]).toHaveTextContent('Name');
        expect(tableHeaders[2]).toHaveTextContent('Status');

        Object.defineProperty(dragStartEvent, 'dataTransfer', {
          value: {
            getData: vi.fn(),
            setData: vi.fn(),
          },
        });
        Object.defineProperty(dragOverEvent, 'dataTransfer', {
          value: {
            getData: vi.fn(),
            setData: vi.fn(),
          },
        });
        Object.defineProperty(dragLeaveEvent, 'dataTransfer', {
          value: {
            getData: vi.fn(),
            setData: vi.fn(),
          },
        });
        Object.defineProperty(dropEvent, 'dataTransfer', {
          value: {
            getData: () => nameColumn.closest(`.${headerCellStyles.headerCell}`)!.id,
          },
        });

        fireEvent(nameColumn, dragStartEvent);
        fireEvent(statusColumn, dragOverEvent);
        await act(() => {
          fireEvent(statusColumn, dropEvent);
        });
        const updatedTableHeaders = getTableHeaders();

        expect(updatedTableHeaders[0]).toHaveTextContent('Id');
        expect(updatedTableHeaders[1]).toHaveTextContent('Status');
        expect(updatedTableHeaders[2]).toHaveTextContent('Name');
      });
    });
  });
});

describe('`rowClassName` prop', () => {
  describe('when is defined', () => {
    it('should apply the className to the row', () => {
      renderWithData({ rowClassName: 'test class' });

      const row = screen.getByText('Zed').closest(`.${rowStyles.row}`)!;

      expect(row).toHaveClass('test class');
    });
  });
});

describe('`rowAriaLabel` prop', () => {
  describe('when is defined', () => {
    it('should apply the passed aria-label to the row', () => {
      renderWithData({ rowAriaLabel: 'Row Aria Label Test' });

      const row = screen.getByText('Zed').closest(`.${rowStyles.row}`)!;

      expect(row).toHaveAttribute('aria-label', 'Row Aria Label Test');
    });
  });
});
