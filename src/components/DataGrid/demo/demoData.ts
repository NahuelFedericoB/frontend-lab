import type { DataGridHeader } from '../DataGrid.types';

export type TeamMember = {
  name: string;
  role: string;
  status: string;
};

export const headers: DataGridHeader<TeamMember>[] = [
  { header: 'name', label: 'Name', minWidth: '120px' },
  { header: 'role', label: 'Role', minWidth: '140px' },
  {
    header: 'status',
    label: 'Status',
    minWidth: '100px',
    formatter: ({ status }) => status.toUpperCase(),
  },
];

export const rows: TeamMember[] = [
  { name: 'Alex Morgan', role: 'Engineer', status: 'Active' },
  { name: 'Jordan Lee', role: 'Designer', status: 'Active' },
  { name: 'Sam Rivera', role: 'Engineer', status: 'Inactive' },
  { name: 'Taylor Kim', role: 'Product manager', status: 'Active' },
  { name: 'Casey Parker', role: 'QA engineer', status: 'Active' },
  { name: 'Robin Ellis', role: 'Designer', status: 'Inactive' },
  { name: 'Michael Scott', role: 'Designer', status: 'Inactive' },
  { name: 'Pam Beesly', role: 'Engineer', status: 'Active' },
  { name: 'Jim Halpert', role: 'Product manager', status: 'Active' },
  { name: 'Dwight Schrute', role: 'QA engineer', status: 'Inactive' },
  { name: 'Angela Martin', role: 'Designer', status: 'Active' },
];

export const defaultOptions = {
  loading: false,
  emptyRows: false,
  showCheckbox: true,
  stickyHeader: true,
  draggable: true,
  resizable: true,
  hideDivisors: false,
};

export type DataGridDemoOptions = typeof defaultOptions;
