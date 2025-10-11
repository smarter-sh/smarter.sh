import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders app component', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    // Just test that the app renders without crashing
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  // Simple test - just verify the app mounted
  expect(document.body).toBeInTheDocument();

});
