import request from 'superagent'

import { TeamTime } from '@models/teamTime'

export async function getIdeas(): Promise<TeamTime[]> {
  const response = await request.get('/api/v1/team-time')
  return response.body.idea
}

export async function addIdea(idea: TeamTime): Promise<TeamTime> {
  console.log(idea)
  const response = await request.post('/api/v1/team-time').send({ idea })
  console.log(response.body.idea)
  return response.body.idea
}
