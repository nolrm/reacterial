import type { Meta, StoryObj } from '@storybook/react';
import PieChart from './PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Default: Story = {
  args: {
    series: [
      { id: 1, value: 40, label: 'Category A' },
      { id: 2, value: 30, label: 'Category B' },
      { id: 3, value: 30, label: 'Category C' },
    ],
  },
};

export const CustomSize: Story = {
  args: {
    series: [
      { id: 1, value: 40, label: 'Category A' },
      { id: 2, value: 30, label: 'Category B' },
      { id: 3, value: 30, label: 'Category C' },
    ],
    width: 600,
    height: 300,
  },
};
