import React from 'react';
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

interface DataGridProps {
  items: any[];
  loading: boolean;
  columns: GridColDef[];
}

const DataGrid: React.FC<DataGridProps> = ({ items, loading, columns }) => {
  return (
    <div style={{ height: 600, width: '100%' }}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          No results found
        </div>
      ) : (
        <MuiDataGrid rows={items} columns={columns} />
      )}
    </div>
  );
};

export default DataGrid;
