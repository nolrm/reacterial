import type { Meta, StoryObj } from '@storybook/react';
import TopSummary from './TopSummary';

const meta: Meta<typeof TopSummary> = {
  title: 'Data Display/TopSummary',
  component: TopSummary,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopSummary>;

export const Default: Story = {};
