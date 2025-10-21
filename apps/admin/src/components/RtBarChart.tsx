import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface RtBarChartProps {
  series: { data: number[] }[];
  xAxis: string[];
}

const RtBarChart: React.FC<RtBarChartProps> = ({ series, xAxis }) => {
  const xAxisObj = [{ data: xAxis, scaleType: 'band' as const }];

  return (
    <BarChart
      series={series}
      height={290}
      xAxis={xAxisObj}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default RtBarChart;
