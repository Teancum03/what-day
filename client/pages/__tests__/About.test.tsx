//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '@/test/setup'

describe('About page renders', () => {
  it('shows the content', async () => {
    const screen = renderRoute('/about')

    const aboutHeader = await screen.findByRole('heading', {
      level: 2,
      name: 'About',
    })
    const todayLink = await screen.findByRole('button', { name: /It's today/i })
    const attribution = await screen.getByText(/created by/i)

    expect(aboutHeader).toBeInTheDocument()
    expect(todayLink).toBeInTheDocument()
    expect(attribution).toHaveTextContent('Created by Team DD')
  })
})
