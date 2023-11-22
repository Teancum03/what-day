//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'

import { renderRoute } from '@/test/setup'
import { waitFor } from '@testing-library/react'

const mockWins = {
  wins: [
    {
      id: 1,
      title: 'My win this week was finding the biggest anthill!',
      author: 'Anonymous Aardvark',
    },
    {
      id: 2,
      title: 'Watched the sunset with my brothers',
      author: 'Muscley Meerkat',
    },
  ],
}

describe('Wins page renders', () => {
  it('renders the loading message', async () => {
    nock('http://localhost').get('/api/v1/wins').reply(200, mockWins)

    const screen = renderRoute('/wednesday')

    const loadingMessage = screen.getByText(`We're loading here...`)
    expect(loadingMessage).toBeInTheDocument()
  })

  it('shows the page content', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/wins')
      .reply(200, mockWins)

    const { user, ...screen } = renderRoute('/wednesday')
    // const { ...screen } = renderRoute('/wednesday')
    await waitFor(() => {
      expect(
        screen.queryByText(`We're loading here...`)
      ).not.toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)

    const newWin = await screen.findByRole('textbox')
    await user.type(newWin, 'I win')

    expect(newWin).toBeInTheDocument()

    expect(newWin).toHaveValue('I win')
  })
})
