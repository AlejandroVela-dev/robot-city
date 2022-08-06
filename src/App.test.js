import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders text output from App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Robot City/i);
  expect(linkElement).toBeInTheDocument();
});
