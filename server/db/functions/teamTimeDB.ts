import connection from "../connection";
import { TeamTime } from "@models/teamTime";

export async function getAllIdeas(db = connection): Promise<TeamTime[]> {
  const ideas = await db<TeamTime>('team_time').select(
    'id',
    'idea',
    'description',
    'author',
    'image',
    'vote_count'
  )
  return ideas
}