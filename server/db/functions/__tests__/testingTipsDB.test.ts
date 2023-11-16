import * as db from '../testingTipsDB'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from '../../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllTips', () => {
  it('gets the complete list of tips', async () => {
    const allTips = await db.getAllTips()
    expect(allTips).toHaveLength(12)
    expect(allTips[1].id).toBe(2)
    expect(allTips[1].title).toBe('DOM Testing')

    expect(allTips[1].thingsToRemember).toBe(
      "A testing utility file could be useful for you render function so that you don't have to write it out every time"
    )

    expect(allTips[1].codeFromClass).toBe(
      'https://github.com/manaia-2023/code-from-class/tree/main/week2/tue-pm'
    )
    expect(allTips[1].linkToLecture).toBe(
      'https://www.youtube.com/watch?v=OM3GM9Z8KBw'
    )
  })
})

afterAll(() => {
  connection.destroy()
})
