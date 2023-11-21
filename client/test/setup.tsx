import { beforeEach, expect, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react/pure'
import userEvent from '@testing-library/user-event'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Jdenticon from 'react-jdenticon'
import { routes } from '@/routes'


vi.mock('react-jdenticon')

beforeEach(cleanup)
expect.extend(matchers)

export function renderRoute(location: string) {
  vi.mocked(Jdenticon).mockImplementation(() => <></>)
  const user = userEvent.setup()

  const router = createMemoryRouter(routes, {
    initialEntries: [location],
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )

  return { user, ...screen }
}
