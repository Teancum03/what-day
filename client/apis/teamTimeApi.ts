import request from 'superagent'

import { TeamTime } from '@models/teamTime'

export async function getIdeas(): Promise<TeamTime[]> {
  const response = await request.get('/api/v1/team-time')
  console.log(response.body.idea)
  return response.body.idea
}
