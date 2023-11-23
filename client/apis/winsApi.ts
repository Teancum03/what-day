import request from 'superagent'

import { Win, WinData } from '@models/wins'

export async function getWins(): Promise<Win[]> {
  const response = await request.get('/api/v1/wins')
  return response.body.wins
}

export async function addWin(newWin: WinData): Promise<Win> {
  const response = await request.post('/api/v1/wins').send(newWin)
  return response.body.win
}
