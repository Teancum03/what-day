import request from 'superagent'

import { Wins } from '@models/wins'

export async function getWins(): Promise<Wins[]> {
  const response = await request.get('/api/v1/wins')
  return response.body.wins
}
