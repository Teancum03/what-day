import connection from '../connection'
import { TeamTime } from '@models/teamTime'

export async function getAllIdeas(db = connection): Promise<TeamTime[]> {
  const ideas = await db<TeamTime[]>('team_time').select(
    'id',
    'idea',
    'description'
  )
  return ideas
}

export async function addProjectIdea(newIdea: TeamTime): Promise<TeamTime> {
  const [addNewIdea] = await connection('team_time')
    .insert(newIdea)
    .returning('*')
  return addNewIdea
}
