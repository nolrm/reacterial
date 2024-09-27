import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Product } from '../service/productService';
import { CircularProgress } from '@mui/material';

interface RtDataGridProps {
  items: Product[];
  loading: boolean;
  columns: GridColDef[];
}

const RtDataGrid: React.FC<RtDataGridProps> = ({ items, loading, columns }) => {
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
        <DataGrid rows={items} columns={columns} />
      )}
    </div>
  );
};

export default RtDataGrid;
