// Monday.test.tsx

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Monday from '../Monday';

const queryClient = new QueryClient();

test('renders Monday component with PageTitle and AffirmationComponent', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Monday />
    </QueryClientProvider>
  );

  const pageTitleElement = await screen.findByRole('heading', { name: /mindful moments/i });
  expect(pageTitleElement).toBeInTheDocument();

  const affirmationComponentElement = await screen.findByTestId('affirmation-component');
  expect(affirmationComponentElement).toBeInTheDocument();
});
