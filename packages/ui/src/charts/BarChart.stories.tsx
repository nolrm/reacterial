import type { Meta, StoryObj } from '@storybook/react';
import BarChart from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const SingleSeries: Story = {
  args: {
    series: [{ data: [35, 44, 24, 34] }],
    xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
};

export const MultiSeries: Story = {
  args: {
    series: [{ data: [35, 44, 24, 34] }, { data: [51, 6, 49, 30] }],
    xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
  },
};
