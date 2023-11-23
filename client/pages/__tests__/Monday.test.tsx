//@vitest-environment jsdom
import { renderRoute } from '@/test/setup'
import '@testing-library/jest-dom'
import nock from 'nock'
import { waitFor } from '@testing-library/react'

test('renders Monday component with PageTitle and AffirmationComponent', async () => {
  const scope = nock('http://localhost')
    .get('/api/v1/mindful-moments')
    .reply(200, { affirmation: 'Your affirmation text' })

  const screen = renderRoute('/monday')

  const pageTitleElement = await screen.findByRole('heading', {
    name: /mindful moments/i,
  })
  const affirmationComponentElement = await screen.findByText(
    'Your affirmation text'
  )
  expect(pageTitleElement).toBeInTheDocument()
  expect(affirmationComponentElement).toBeInTheDocument()
  expect(scope.isDone()).toBe(true)
})

it('renders the error message', async () => {
  nock('http://localhost').get('/api/v1/mindful-moments').reply(500)

  const screen = renderRoute('/monday')

  await waitFor(() => {
    expect(screen.queryByText('Loading')).not.toBeInTheDocument()
  })

  const errorMessage = await screen.findByText(/Something went wrong/i)
  expect(errorMessage).toBeInTheDocument()
})

it('renders the loading state', async () => {
  nock('http://localhost')
    .get('/api/v1/mindful-moments')
    .delay(500)
    .reply(200, { affirmation: 'Your affirmation text' })

  const screen = renderRoute('/monday')

  const loadingIndicator = await screen.findByText('Loading')
  expect(loadingIndicator).toBeInTheDocument()

  await screen.findByText('Your affirmation text')

  expect(screen.queryByText('Loading')).not.toBeInTheDocument()
})
