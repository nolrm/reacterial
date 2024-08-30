import React from 'react';
import LayoutAdmin from '@/layouts/LayoutAdmin';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Grid, Paper } from '@mui/material';
import styles from './index.module.css';
import RtBarChart from '@/components/RtBarChart';
import RtPieChart from '@/components/RtPieChart';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <LayoutAdmin>
      <div className="test">
        Welcome, {user.name}!<p>Email: {user.email}</p>
      </div>

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
              <RtBarChart />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <Paper className={styles.paper}>
              <RtPieChart />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </LayoutAdmin>
  );
};

export default DashboardPage;
