//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'
import { renderRoute } from '@/test/setup'
import { waitFor } from '@testing-library/react'

const mockIdeas = {
  idea: [
    {
      id: 1,
      idea: 'Duck vs Bear',
      description:
        'An app that gets users to choose between to scary options at a time and shows a list of the most scary!',
    },

    {
      id: 2,
      idea: 'Pokemon Game',
      description: 'An game about pokemon',
    },
  ],
}

describe('Thursday page renders', () => {
  it('renders the loading message', async () => {
    nock('http://localhost').get('/api/v1/team-time').reply(200, mockIdeas)

    const screen = renderRoute('/thursday')
    const loadingMessage = screen.getByText(`Loading ideas...`)
    expect(loadingMessage).toBeInTheDocument()
  })

  it('shows page content', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/team-time')
      .reply(200, mockIdeas)

    const screen = renderRoute('/thursday')

    await waitFor(() => {
      expect(screen.queryByText(`Loading idea...`)).not.toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)

    const IdeaButton = await screen.findByRole('button', {
      name: /Duck vs Bear/i,
    })
    expect(IdeaButton).toBeInTheDocument()
  })

  it('renders the error message', async () => {
    nock('http://localhost').get('/api/v1/team-time').reply(500)

    const screen = renderRoute('/thursday')

    await waitFor(() => {
      expect(screen.queryByText('Loading idea...')).not.toBeInTheDocument()
    })

    const loadingMessage = await screen.findByText(/Error:/i)
    expect(loadingMessage).toMatchInlineSnapshot(`
    <p>
      Error: unable to load ideas
    </p>
    `)
  })
})
