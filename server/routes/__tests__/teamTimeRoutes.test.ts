import { expect, it, vi, describe } from 'vitest'
import request from 'supertest'
import server from '../../server'
import { getAllIdeas } from '../../db/functions/teamTimeDB'

vi.mock('../../db/functions/teamTimeDB')

describe('/', () => {
  it('calls getAllIdeas', async () => {
    vi.mocked(getAllIdeas).mockImplementation(async () => {
      return [
        {
          id: 2,
          idea: 'Pokemon Game',
          description: 'An game about pokemon',
          author: '',
          image: '',
          vote_count: 0,
        },
      ]
    })
    const res = await request(server).get('/api/v1/team-time')
    expect(res.statusCode).toBe(200)
    expect(getAllIdeas).toHaveBeenCalled()
  })
})
