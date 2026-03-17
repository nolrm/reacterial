import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  test('1. Renders error message when message is not null', () => {
    const message = 'This is an error!';
    render(<ErrorMessage message={message} />);

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent(message);
  });

  test('2. does not render anything when message is null', () => {
    render(<ErrorMessage message={null} />);

    const alertElement = screen.queryByRole('alert');
    expect(alertElement).not.toBeInTheDocument();
  });
});
