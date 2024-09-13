import React from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import Typography from '@mui/material/Typography';
import RtBarChart from '@/components/RtBarChart';
import RtLineChart from '@/components/RtLineChart';

const chartBarSeries = [
  { data: [35, 44, 24, 34] },
  { data: [51, 6, 49, 30] },
  { data: [15, 25, 30, 50] },
  { data: [60, 50, 15, 25] },
];

const chartBarXAxis = ['Q1', 'Q2', 'Q3', 'Q4'];

const ChartsPage: React.FC = () => {
  return (
    <LayoutAdmin>
      <Typography variant="h4" component="h1" gutterBottom>
        Charts
      </Typography>
      <RtBarChart series={chartBarSeries} xAxis={chartBarXAxis} />
      <RtLineChart />
    </LayoutAdmin>
  );
};

export default ChartsPage;
