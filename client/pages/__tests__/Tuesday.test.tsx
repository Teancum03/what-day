//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'

import { renderRoute } from '@/test/setup'
import { waitFor, within } from '@testing-library/react'

const mockTipsData = {
  tips: [
    {
      id: 1,
      title: 'Server-Side Routes',
      whatWeTest:
        'The status code recieved from the server (eg 200 or 404); The body from the response; The headers (meta information, like the location for a redirrect)',
      thingsToRemember: 'These tests will be async',
      extraInstalls:
        'supertest (to fake a request to our server); testing-library/dom',
      codeFromClass:
        'https://github.com/manaia-2023/code-from-class/tree/main/week2/mon-pm',
      linkToLecture: 'https://www.youtube.com/watch?v=kN3VqzLCWFQ',
    },
    {
      id: 2,
      title: 'DOM Testing',
      whatWeTest: `What appears in our DOM when we make requests to our server;
      Is what we're serving rendering what we want? This includes semantics for accessibility`,
      thingsToRemember: `A testing utility file could be useful for you render function so that you don't have to write it out every time`,
      extraInstalls: `jsdom;
      testing-library/dom;
      supertest`,
      codeFromClass:
        'https://github.com/manaia-2023/code-from-class/tree/main/week2/tue-pm',
      linkToLecture: 'https://www.youtube.com/watch?v=OM3GM9Z8KBw',
    },
  ],
}

describe('Home page renders', () => {
  it('renders the loading message', async () => {
    nock('http://localhost')
      .get('/api/v1/testing-tips')
      .reply(200, mockTipsData)

    const screen = renderRoute('/tuesday')

    const loadingMessage = screen.getByText('Loading Testing Tips...')
    expect(loadingMessage).toBeInTheDocument()
  })

  it('shows the page content', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/testing-tips')
      .reply(200, mockTipsData)

    const { user, ...screen } = renderRoute('/tuesday')

    await waitFor(() => {
      expect(
        screen.queryByText('Loading Testing Tips...')
      ).not.toBeInTheDocument()
    })

    expect(scope.isDone()).toBe(true)

    const tipsButton = await screen.findByRole('button', {
      name: /Select Your Tip/i,
    })

    const additionalTipsButton = await screen.findByRole('button', {
      name: /Additional Tips/i,
    })

    const domTestingButton = await screen.findByRole('tab', {
      name: mockTipsData.tips[1].title,
    })

    const tipsInitialHeader = await screen.findByRole('heading', {
      level: 1,
      name: mockTipsData.tips[0].title,
    })

    expect(tipsButton).toBeInTheDocument()
    expect(tipsInitialHeader).toBeInTheDocument()
    expect(additionalTipsButton).toBeInTheDocument()
    expect(domTestingButton).toBeInTheDocument()

    await user.click(domTestingButton)

    const tipsSecondHeader = await screen.findByRole('heading', {
      level: 1,
      name: mockTipsData.tips[1].title,
    })
    const tipsVideoHeader = await screen.findByRole('heading', {
      level: 2,
      name: /link to lecture/i,
    })

    expect(tipsInitialHeader).not.toBeInTheDocument()
    expect(tipsSecondHeader).toBeInTheDocument()
    expect(tipsVideoHeader).toBeInTheDocument()
    const videoContainer = tipsVideoHeader.nextElementSibling as HTMLElement
    const video = await within(videoContainer).findByRole('presentation')
    expect(video).toMatchInlineSnapshot(`
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen=""
        frameborder="0"
        height="480"
        role="presentation"
        src="https://www.youtube.com/embed/OM3GM9Z8KBw"
        title="Embedded youtube"
        width="853"
      />
    `)
  })

  it('renders the error message', async () => {
    nock('http://localhost').get('/api/v1/testing-tips').reply(500)

    const screen = renderRoute('/tuesday')

    await waitFor(() => {
      expect(
        screen.queryByText('Loading Testing Tips...')
      ).not.toBeInTheDocument()
    })

    const loadingMessage = await screen.findByText(/Error:/i)
    expect(loadingMessage).toMatchInlineSnapshot(`
      <p>
        Error: unable to load Testing Tips
      </p>
    `)
  })
})
