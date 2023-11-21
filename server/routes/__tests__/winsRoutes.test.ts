import { expect, it, vi, describe } from 'vitest'
import request from 'supertest'

import server from '../../server'
import { getAllWins } from '../../db/functions/winsDB'

vi.mock('../../db/functions/winsDB')

describe('/', () => {
  it('calls getAllWins', async () => {
    vi.mocked(getAllWins).mockImplementation(async () => {
      return [
        {
          id: 1,
          title: 'My win this week was finding the biggest anthill!',
          author: 'Anonymous Aardvark',
        },
      ]
    })
    const res = await request(server).get('/api/v1/wins')
    expect(res.statusCode).toBe(200)
    expect(getAllWins).toHaveBeenCalled()
    expect(res.body.wins[0].author).toBe('Anonymous Aardvark')
  })
})
