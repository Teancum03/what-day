import request from 'superagent'

import { PexelsResponse } from '../../models/gallery'

export async function getImages(): Promise<PexelsResponse> {
  const response = await request.get('/api/v1/gallery')
  return response.body
}
