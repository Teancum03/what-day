import connection from '../connection'
import { TeamTime } from '@models/teamTime'

export async function getAllIdeas(db = connection): Promise<TeamTime[]> {
  const ideas = await db<TeamTime[]>('team_time').select(
    'id',
    'idea',
    'description',
    'author'
  )
  return ideas
}

export async function addProjectIdea(newIdea: TeamTime): Promise<TeamTime> {
  const [addNewIdea] = await connection
    .insert(newIdea)
    .into('team_time')
    .returning('*')
  return addNewIdea
}
