import React, { useState, useEffect } from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import { Container, TextField, CircularProgress } from '@mui/material';
import { fetchAllProducts, searchProducts, Product } from '@/service/productService';
import RtDataGrid from '@/components/RtDataGrid';
import { GridColDef } from '@mui/x-data-grid';

const ProductList = (): JSX.Element => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 150 }
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        loadProducts(searchTerm);
      } else {
        loadProducts();
      }
    }, 300); // Debounce time

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const loadProducts = async (search: string = ''): Promise<void> => {
    setLoading(true);
    try {
      const data = search ? await searchProducts(search) : await fetchAllProducts();
      setItems(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAdmin>
      <Container style={{ marginTop: '50px' }}>
        <h1>Product List</h1>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <RtDataGrid items={items} loading={loading} columns={columns} />
      </Container>
    </LayoutAdmin>
  );
};

export default ProductList;
