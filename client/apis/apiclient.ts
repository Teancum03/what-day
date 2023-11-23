import request from 'superagent'
import { Affirmation } from '../../models/affirmation.ts'

export async function getAffirmation(): Promise<Affirmation> {
  const response = await request.get('/api/v1/mindful-moments')

  return response.body
}
