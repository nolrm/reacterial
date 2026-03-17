import React from 'react';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';

interface BarChartProps {
  series: { data: number[] }[];
  xAxis: string[];
}

const BarChart: React.FC<BarChartProps> = ({ series, xAxis }) => {
  const xAxisObj = [{ data: xAxis, scaleType: 'band' as const }];

  return (
    <MuiBarChart
      series={series}
      height={290}
      xAxis={xAxisObj}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default BarChart;
