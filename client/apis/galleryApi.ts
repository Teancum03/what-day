import request from 'superagent'
import { PexelsResponse } from '@models/gallery'

export async function getImages(search: string): Promise<PexelsResponse> {
  const response = await request.get('/api/v1/gallery').query({ search })
  return response.body
}
