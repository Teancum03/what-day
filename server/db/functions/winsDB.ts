import connection from '../connection'

import { Win, WinData } from '@models/wins'

const db = connection

export async function getAllWins(): Promise<Win[]> {
  const wins = await db<Win>('wins')
    .select('title', 'author', 'id')
    
  return wins
}

export async function addWin(newWin: WinData): Promise<Win> {
  const [win] = await db('wins').insert(newWin).returning('*')
  console.log(win)
  return win
}
