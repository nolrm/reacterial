import React, { useState } from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Badge,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Pagination,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import invoices from '@/data/invoices';
import RtTopSummary from '@/components/RtTopSummary';

// Helper function to apply badge colors based on status
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Paid':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Overdue':
      return 'error';
    default:
      return 'default';
  }
};

const InvoiceList: React.FC = () => {
  // State for search, filter, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Display 5 items per page

  // Filter and Search logic
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === 'All' || invoice.status === statusFilter)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const displayedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <LayoutAdmin>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Invoice List
        </Typography>

        <RtTopSummary></RtTopSummary>

        <Box component={Paper}>
          {/* Search Bar and Filter */}
          <Box display="flex" justifyContent="space-between" mb={3}>
            <TextField
              label="Search by Customer"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: '60%' }}
            />
            <FormControl variant="outlined" sx={{ width: '35%' }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as string)}
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell align="right">
                      ${invoice.amount.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Badge
                        badgeContent={invoice.status}
                        color={getStatusBadgeColor(invoice.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ ml: 2 }}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </LayoutAdmin>
  );
};

export default InvoiceList;
