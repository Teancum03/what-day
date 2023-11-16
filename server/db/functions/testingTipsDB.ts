import connection from '../connection'

import { TestingTip } from '@models/testingTips'

export async function getAllTips(db = connection): Promise<TestingTip[]> {
  const tips = await db<TestingTip>('testing_tips').select(
    'id',
    'title',
    'what_we_test as whatWeTest',
    'things_to_remember as thingsToRemember',
    'extra_installs as extraInstalls',
    'code_from_class as codeFromClass',
    'link_to_lecture as linkToLecture'
  )
  return tips
}
