import { expect, it, vi, describe } from 'vitest'
import request from 'supertest'

import server from '../../server'
import { getAllTips } from '../../db/functions/testingTipsDB'

vi.mock('../../db/functions/testingTipsDB')

describe('/', () => {
  it('calls getAllTips', async () => {
    vi.mocked(getAllTips).mockImplementation(async () => {
      return [
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
      ]
    })
    const res = await request(server).get('/api/v1/testing-tips')
    expect(res.statusCode).toBe(200)
    expect(getAllTips).toHaveBeenCalled()
  })
})
