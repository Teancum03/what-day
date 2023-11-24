//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '@/test/setup'

describe('About page renders', () => {
  it('shows the content', async () => {
    const screen = renderRoute('/gibberish')

    const aboutHeader = await screen.findByRole('heading', {
      level: 2,
      name: '404',
    })

    expect(aboutHeader).toBeInTheDocument()
  })
})
