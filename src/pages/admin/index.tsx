import React from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Grid, Paper } from '@mui/material';
import styles from './index.module.css';
import RtBarChart from '@/components/RtBarChart';
import RtPieChart from '@/components/RtPieChart';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const barData = [
  { data: [35, 44, 24, 34] },
  { data: [51, 6, 49, 30] },
  { data: [15, 25, 30, 50] },
  { data: [60, 50, 15, 25] },
];

const barXAxis = ['Q1', 'Q2', 'Q3', 'Q4'];

const pieData = [
  { id: 0, value: 10, label: 'series A' },
  { id: 1, value: 15, label: 'series B' },
  { id: 2, value: 20, label: 'series C' },
];

const DashboardPage: React.FC = () => {
  return (
    <LayoutAdmin>
      <div className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="bg-gradient-support-1" sx={{ padding: 1.3 }}>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4" sx={{ marginBottom: 3 }}>
                  1,234
                </Typography>
                <Typography variant="h6">Increase 2%</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="bg-gradient-support-2" sx={{ padding: 1.3 }}>
              <CardContent>
                <Typography variant="h6">Active Users</Typography>
                <Typography variant="h4" sx={{ marginBottom: 3 }}>
                  567
                </Typography>
                <Typography variant="h6">Increase 2%</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="bg-gradient-support-3" sx={{ padding: 1.3 }}>
              <CardContent>
                <Typography variant="h6">Sales</Typography>
                <Typography variant="h4" sx={{ marginBottom: 3 }}>
                  $12,345
                </Typography>
                <Typography variant="h6">Increase 2%</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={7}>
            <Paper className={styles.paper}>
              <RtBarChart series={barData} xAxis={barXAxis} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <Paper className={styles.paper}>
              <RtPieChart series={pieData} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </LayoutAdmin>
  );
};

export default DashboardPage;
