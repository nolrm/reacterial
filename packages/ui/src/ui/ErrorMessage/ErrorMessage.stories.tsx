import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const WithMessage: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
  },
};

export const NoMessage: Story = {
  args: {
    message: null,
  },
};
