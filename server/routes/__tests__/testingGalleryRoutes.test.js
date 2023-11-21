import { expect, it, vi, describe } from 'vitest'
import request from 'supertest'

import server from '../../server'
import { getImages } from '../../apiCalls/pexelApiCalls'

import { singleImageResponse } from './mockedData/pexelResponseData'

vi.mock('../../apiCalls/pexelApiCalls')

describe('/', () => {
  it('calls getImages', async () => {
    vi.mocked(getImages).mockImplementation(async () => {
      return singleImageResponse
    })

    const res = await request(server).get('/api/v1/gallery')
    expect(res.statusCode).toBe(200)
    expect(getImages).toHaveBeenCalled()
  })
})
