import React from 'react';
import { PieChart } from '@mui/x-charts';

interface SeriesData {
  id: number;
  value: number;
  label: string;
}

interface RtPieChartProps {
  series: SeriesData[];
  width?: number;
  height?: number;
}

const RtPieChart: React.FC<RtPieChartProps> = ({
  series,
  width = 400,
  height = 200,
}) => {
  return (
    <PieChart
      series={[{ data: series }]}
      width={width}
      height={height}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          padding: 0,
        },
      }}
    />
  );
};

export default RtPieChart;
