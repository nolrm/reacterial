import React from 'react';

interface Invoice {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Pending' | 'Overdue';
}

const invoices: Invoice[] = [
  {
    id: 'INV001',
    date: '2023-09-10',
    customer: 'John Doe',
    amount: 250.0,
    status: 'Paid',
  },
  {
    id: 'INV002',
    date: '2023-09-11',
    customer: 'Jane Smith',
    amount: 450.0,
    status: 'Pending',
  },
  {
    id: 'INV003',
    date: '2023-09-12',
    customer: 'Acme Corp.',
    amount: 1200.0,
    status: 'Overdue',
  },
  {
    id: 'INV004',
    date: '2023-09-13',
    customer: 'Big Co.',
    amount: 600.0,
    status: 'Paid',
  },
  {
    id: 'INV005',
    date: '2023-09-14',
    customer: 'Small LLC',
    amount: 175.0,
    status: 'Pending',
  },
  {
    id: 'INV006',
    date: '2023-09-15',
    customer: 'Tech World',
    amount: 900.0,
    status: 'Paid',
  },
  {
    id: 'INV007',
    date: '2023-09-16',
    customer: 'Green Energy',
    amount: 300.0,
    status: 'Overdue',
  },
  {
    id: 'INV008',
    date: '2023-09-17',
    customer: 'Cloud Solutions',
    amount: 550.0,
    status: 'Pending',
  },
  {
    id: 'INV009',
    date: '2023-09-18',
    customer: 'Retailers Inc.',
    amount: 1250.0,
    status: 'Paid',
  },
  {
    id: 'INV010',
    date: '2023-09-19',
    customer: 'Global Logistics',
    amount: 700.0,
    status: 'Overdue',
  },
  {
    id: 'INV011',
    date: '2023-09-20',
    customer: 'Food Market',
    amount: 400.0,
    status: 'Paid',
  },
  {
    id: 'INV012',
    date: '2023-09-21',
    customer: 'Car Dealers',
    amount: 1350.0,
    status: 'Pending',
  },
  {
    id: 'INV013',
    date: '2023-09-22',
    customer: 'Auto Repairs',
    amount: 480.0,
    status: 'Paid',
  },
  {
    id: 'INV014',
    date: '2023-09-23',
    customer: 'Consultancy Co.',
    amount: 640.0,
    status: 'Overdue',
  },
  {
    id: 'INV015',
    date: '2023-09-24',
    customer: 'Design Studio',
    amount: 860.0,
    status: 'Pending',
  },
];

export default invoices;
