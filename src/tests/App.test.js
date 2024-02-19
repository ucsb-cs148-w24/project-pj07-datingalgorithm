import { render, screen } from '@testing-library/react';
import App from '../App';

test('test renders blindly', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Blindly/i);
  expect(linkElements[0]).toBeInTheDocument();
});
