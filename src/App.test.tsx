import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders description', () => {
  render(<App />);
  const desc = screen.getByText(/React \+ Material UI/i);
  expect(desc).toBeInTheDocument();
});
