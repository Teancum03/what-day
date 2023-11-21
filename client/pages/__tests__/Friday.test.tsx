//@vitest-environment jsdom

// MOCK THE NETWORK REQUEST USING NOCK.
// TEST FOR HEADER TEXT.
// HANDLE THE PAGE LOADING.
// HANDLE THE GET IMAGES.

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

import { describe, expect, test } from 'vitest'
import nock from 'nock'
import { renderRoute } from '@/test/setup'
import { waitFor, within } from '@testing-library/react'

describe('Friday page renders', () => {
  test('Loading text', async () => {
    nock('http://localhost').get('/api/v1/gallery').reply(200, MOCK_DATA)
    const screen = renderRoute('/friday')
    const loading = screen.getByText('Loading...')
    expect(loading).toBeInTheDocument()
  })
})
