import connection from '../connection'

import { Wins } from '@models/wins'

const db = connection

export async function getAllWins(): Promise<Wins[]> {
  const wins = await db<Wins>('wins').select('title', 'author')
  return wins
}

export async function addWin(newWin: Wins): Promise<Wins> {
  const [win] = await db('win').insert(newWin).returning('*')
  return win
}