import React from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import Typography from '@mui/material/Typography';
import RtBarChart from '@/components/RtBarChart';
import RtLineChart from '@/components/RtLineChart';

const ChartsPage: React.FC = () => {
  return (
    <LayoutAdmin>
      <Typography variant="h4" component="h1" gutterBottom>
        Charts
      </Typography>
      <RtBarChart />
      <RtLineChart />
    </LayoutAdmin>
  );
};

export default ChartsPage;
