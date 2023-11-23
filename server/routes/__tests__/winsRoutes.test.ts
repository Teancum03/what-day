import { expect, it, vi, describe } from 'vitest'
import request from 'supertest'

import server from '../../server'
import { addWin, getAllWins } from '../../db/functions/winsDB'

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
  it('calls addWin', async () => {
    vi.mocked(addWin).mockResolvedValue({
      id: 999,
      title: 'passing tests',
      author: 'Bedazzling Bulbuous Bonobo',
    })

    const response = await request(server)
      .post('/api/v1/wins/')
      .send({ title: 'passing tests', author: 'Bedazzling Bulbuous Bonobo' })

    expect(vi.mocked(addWin)).toHaveBeenCalledWith({
      title: 'passing tests',
      author: 'Bedazzling Bulbuous Bonobo',
    })
    expect(response.status).toBe(200)
    expect(response.body.win).toMatchInlineSnapshot(`
      {
        "author": "Bedazzling Bulbuous Bonobo",
        "id": 999,
        "title": "passing tests",
      }
    `)
  })
  it('returns an error if getAllWins throws', async () => {
    const error = new Error('DATABASE ERROR: unable to get wins')
    vi.mocked(getAllWins).mockRejectedValue(error)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server).get('/api/v1/wins')

    expect(response.status).toBe(500)
    expect(response.text).toContain(
      `Something went wrong getting wins from the database: ${error}`
    )
  })
})
