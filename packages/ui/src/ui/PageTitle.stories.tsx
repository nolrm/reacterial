import type { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';

const meta: Meta<typeof PageTitle> = {
  title: 'UI/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const WithDivider: Story = {
  args: {
    children: 'Dashboard',
  },
};

export const WithoutDivider: Story = {
  args: {
    children: 'Dashboard',
    withDivider: false,
  },
};
