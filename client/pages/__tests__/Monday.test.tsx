//@vitest-environment jsdom
import { renderRoute } from '@/test/setup'; 
import '@testing-library/jest-dom';
import nock from 'nock';

test('renders Monday component with PageTitle and AffirmationComponent', async () => {
  const scope = nock('http://localhost')
      .get('/api/v1/mindful-moments')
    .reply(200, { affirmation: 'Your affirmation text' });

  const screen = renderRoute('/monday'); 

  const pageTitleElement = await screen.findByRole('heading', { name: /mindful moments/i });
  const affirmationComponentElement = await screen.findByText('Your affirmation text')
  expect(pageTitleElement).toBeInTheDocument();
  expect(affirmationComponentElement).toBeInTheDocument();
  expect(scope.isDone()).toBe(true);
});


