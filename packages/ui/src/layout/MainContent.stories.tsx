import type { Meta, StoryObj } from '@storybook/react';
import MainContent from './MainContent';

const meta: Meta<typeof MainContent> = {
  title: 'Layout/MainContent',
  component: MainContent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainContent>;

export const DrawerOpen: Story = {
  args: {
    isDrawerOpen: true,
    children: 'Page content goes here.',
  },
};

export const DrawerClosed: Story = {
  args: {
    isDrawerOpen: false,
    children: 'Page content goes here.',
  },
};
