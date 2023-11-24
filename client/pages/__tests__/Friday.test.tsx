//@vitest-environment jsdom

const MOCK_DATA = {
  page: 1,
  per_page: 1,
  photos: [
    {
      id: 772803,
      width: 4000,
      height: 2750,
      url: 'hello',
      photographer: 'Tyler Lastovich',
      photographer_url: 'test',
      photographer_id: 129858,
      avg_color: '#818C98',
      src: {
        original:
          'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg',
        large2x:
          'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        large:
          'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&h=130',
        portrait:
          'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        landscape:
          'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        tiny: 'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      liked: false,
      alt: 'Snow-coated Rocky Mountains',
    },
  ],
  total_results: 8000,
  next_page: 'https://api.pexels.com/v1/search/?page=2&per_page=1&query=Nature',
}

import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest'
import nock from 'nock'
import { renderRoute } from '@/test/setup'
import { waitFor } from '@testing-library/react'
import * as reactRouterDom from 'react-router-dom'

const navigate = vi.fn()
const mockedUseNavigate = vi.fn()

beforeEach(() => {
  vi.spyOn(reactRouterDom, 'useNavigate').mockImplementation(() => navigate)
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('Friday page renders', () => {
  test('Loading text', async () => {
    const screen = renderRoute('/friday')
    nock('http://localhost').get('/api/v1/gallery').reply(200, MOCK_DATA)
    const loading = screen.getByText('Loading...')
    expect(loading).toBeInTheDocument()
  })

  test('Error text', async () => {
    nock('http://localhost').get('/api/v1/gallery').reply(500, MOCK_DATA)
    const screen = renderRoute('/friday')
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    )
    const error = screen.getByText(/Error:/)
    expect(error).toBeInTheDocument()
  })

  test('Images rendered', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/gallery')
      .query({ search: 'default' })
      .reply(200, MOCK_DATA)

    const screen = renderRoute('/friday')

    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    )

    expect(scope.isDone()).toBe(true)

    const data = screen.getByAltText(/Tyler Lastovich/i)
    expect(data).toBeInTheDocument()
  })
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...(actual as typeof reactRouterDom),
    useNavigate: () => mockedUseNavigate,
  }
})

describe('SearchBar', () => {
  test('SearchBar renders', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/gallery')
      .query({ search: 'default' })
      .reply(200, MOCK_DATA)

    const { user, ...screen } = renderRoute('/friday')
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    )
    const button = await screen.queryByText(/Find/)
    const input = await screen.queryByLabelText('Search')
    await user.type(input as Element, 'helloworld')
    await user.click(button as HTMLElement)
    expect(navigate).toHaveBeenCalledWith({
      pathname: '/friday',
      search: `image=helloworld`,
    })
    expect(scope.isDone()).toBe(true)
  })
})
