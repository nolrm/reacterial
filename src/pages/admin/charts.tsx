import React from 'react';
import LayoutAdmin from '@/components/layout-admin';
import Typography from '@mui/material/Typography';
import BarChartComponent from '@/components/BarChartComponent';
import LineChartComponent from '@/components/LineChartComponent';

const ChartsPage: React.FC = () => {
    return (
        <LayoutAdmin>
            <Typography variant="h4" component="h1" gutterBottom>
                Charts
            </Typography>
            <BarChartComponent/>
            <LineChartComponent/>
        </LayoutAdmin>
    );
};

export default ChartsPage;