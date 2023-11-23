import request from 'superagent'

import { TeamTime } from '@models/teamTime'

export async function getIdeas(): Promise<TeamTime[]> {
  const response = await request.get('/api/v1/team-time')
  return response.body.idea
}

export async function addIdea(idea: TeamTime): Promise<TeamTime> {
  const response = await request.post('/api/v1/team-time').send({ idea })
  return response.body.idea
}
