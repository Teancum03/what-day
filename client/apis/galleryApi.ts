import request from 'superagent'
import { PexelsResponse, ImageSearch } from '@models/gallery'

export async function getImages(search: string): Promise<PexelsResponse> {
  console.log(search);
  
  const response = await request.get('/api/v1/gallery').query({ search })
  return response.body
}
