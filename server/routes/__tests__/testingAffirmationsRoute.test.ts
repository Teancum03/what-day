import { expect, it, describe } from 'vitest'
import request from 'supertest'
import server from '../../routes/affirmationsroute'
import nock from 'nock'

describe('/', () => {
  it('returns a 200 status code', async () => {
    nock('https://www.affirmations.dev')
      .get('/')
      .reply(200, { affirmation: 'Your affirmation text' })

    const res = await request(server).get('/api/v1/mindful-moments')

    expect(res.statusCode).toBe(200)

    expect(res.body).toHaveProperty('affirmation')
    expect(typeof res.body.affirmation).toBe('string')
  })
})
