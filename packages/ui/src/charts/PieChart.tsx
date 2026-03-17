import React from 'react';
import { PieChart as MuiPieChart } from '@mui/x-charts';

interface SeriesData {
  id: number;
  value: number;
  label: string;
}

interface PieChartProps {
  series: SeriesData[];
  width?: number;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  series,
  width = 400,
  height = 200,
}) => {
  return (
    <MuiPieChart
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

export default PieChart;
