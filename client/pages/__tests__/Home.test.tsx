//@vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { renderRoute } from '@/test/setup'
import { within } from '@testing-library/react'

import { getNewUser, getShortName } from '@/lib/utils'

vi.mock('@/lib/utils')

const mockAnimal = {
  name: 'Big Dog',
  longName: 'Big Red Dog',
}

describe('Home page renders', () => {
  it('shows the navbar content', async () => {
    vi.mocked(getNewUser).mockReturnValue(mockAnimal)
    vi.mocked(getShortName).mockReturnValue(mockAnimal.name)

    const screen = renderRoute('/')

    const nav = await screen.getByRole('navigation')

    const homeLink = await screen.findByRole('link', {
      name: /What day is it/i,
    })
    const dayLinks = within(nav).getByRole('list')
    const mondayLink = within(dayLinks).getByText('Monday')
    const welcome = within(nav).getByText('Welcome,')

    expect(homeLink).toBeInTheDocument()
    expect(dayLinks.children).toHaveLength(5)
    expect(mondayLink).toBeInTheDocument()
    expect(welcome.nextElementSibling).toHaveTextContent(mockAnimal.name)
  })

  it('shows the page content', async () => {
    const screen = renderRoute('/')

    const aboutHeader = await screen.findByRole('heading', {
      level: 1,
    })
    const todayLink = await screen.findByRole('button', { name: /It's today/i })
    const splashImg = await screen.getByAltText(/pooh and christopher/i)

    expect(aboutHeader).toBeInTheDocument()
    expect(todayLink).toBeInTheDocument()
    expect(splashImg).toHaveAttribute('src', '/images/splash.png')
  })

  it('shows the footer content', async () => {
    const screen = renderRoute('/')

    const tomorrowLink = await screen.findByRole('button', {
      name: /let's go/i,
    })
    const copyright = await screen.getByText(/2023 Copyright/i)
    const aboutLink = await screen.getByRole('link', { name: 'wdii' })

    expect(tomorrowLink).toBeInTheDocument()
    expect(copyright).toHaveTextContent('© 2023 Copyright: wdii')
    expect(aboutLink).toBeInTheDocument()
  })
})
