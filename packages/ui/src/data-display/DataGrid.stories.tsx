import type { Meta, StoryObj } from '@storybook/react';
import type { GridColDef } from '@mui/x-data-grid';
import DataGrid from './DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'Data Display/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'role', headerName: 'Role', width: 150 },
];

const rows = [
  { id: 1, name: 'Alice Johnson', role: 'Admin' },
  { id: 2, name: 'Bob Smith', role: 'User' },
  { id: 3, name: 'Carol White', role: 'User' },
];

export const WithData: Story = {
  args: {
    items: rows,
    loading: false,
    columns,
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
    loading: false,
    columns,
  },
};

export const LoadingState: Story = {
  args: {
    items: [],
    loading: true,
    columns,
  },
};
