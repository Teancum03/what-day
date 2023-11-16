import request from 'superagent'

import { TestingTip } from '@models/testingTips'

export async function getTips(): Promise<TestingTip[]> {
  const response = await request.get('/api/v1/testing-tips')
  return response.body.tips
}
