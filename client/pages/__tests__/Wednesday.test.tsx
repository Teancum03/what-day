//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'

import { renderRoute } from '@/test/setup'
import { waitFor } from '@testing-library/react'

import { vi } from 'vitest'
import { getNewUser } from '@/lib/utils'

vi.mock('@/lib/utils')

beforeEach(() => {
  vi.mocked(getNewUser).mockReturnValue({
    name: 'Anonymous Aardvark',
    longName: 'Anonymous Invisible Aardvark',
  })
})

afterAll(() => {
  vi.restoreAllMocks()
})

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

  it('adds a new win', async () => {
    nock('http://localhost').get('/api/v1/wins').reply(200, mockWins)

    const addWinScope = nock('http://localhost')
      .post('/api/v1/wins', {
        title: 'I added a win',
        author: 'Anonymous Invisible Aardvark',
      })
      .reply(200, {
        win: {
          id: 27,
          title: 'I added a win',
          author: 'Anonymous Invisible Aardvark',
        },
      })

    const newGetScope = nock('http://localhost')
      .get('/api/v1/wins')
      .reply(200, {
        wins: [
          ...mockWins.wins,
          {
            id: 27,
            title: 'I added a win',
            author: 'Anonymous Invisible Aardvark',
          },
        ],
      })

    const { user, ...screen } = renderRoute('/wednesday')
    const newWin = await screen.findByLabelText('Add Win')
    const submit = await screen.findByRole('button', { name: /Post/i })

    await user.type(newWin, 'I added a win')
    await user.click(submit)

    await waitFor(() => {
      expect(screen.queryByText(`Adding your Win!`)).not.toBeInTheDocument()
    })

    const addedWin = await screen.findByText('I added a win')
    expect(addedWin).toBeInTheDocument()
    expect(addWinScope.isDone()).toBe(true)
    expect(newGetScope.isDone()).toBe(true)
  })
})
