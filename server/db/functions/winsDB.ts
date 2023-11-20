import connection from '../connection'

import { Wins } from '@models/wins'

export async function getAllWins(db = connection): Promise<Wins[]> {
  const wins = await db<Wins>('wins').select('title', 'author')
  return wins
}