import { render, screen } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
test('renders SurfSync title', () => {
  render(<App />);
  expect(screen.getByText(/SurfSync/i)).toBeInTheDocument();
});
