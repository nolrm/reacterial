import React from 'react';
import { render, screen } from '@testing-library/react';
import RtError from './RtError';

describe('RtError component', () => {
  test('1. Renders error message when message is not null', () => {
    const message = 'This is an error!';
    render(<RtError message={message} />);

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(message);
  });

  test('2. does not render anything when message is null', () => {
    render(<RtError message={null} />);

    const alertElement = screen.queryByRole('alert');
    expect(alertElement).not.toBeInTheDocument();
  });
});
