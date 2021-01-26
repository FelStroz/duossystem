import React from 'react';
import { render } from '@testing-library/react';
import AdminPage from "./pages/Admin";

test('renders learn react link', () => {
  const { getByText } = render(<AdminPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
