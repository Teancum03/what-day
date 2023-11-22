import * as db from '../winsDB'
import { describe, it, expect, beforeAll, beforeEach } from 'vitest'

import connection from '../../connection'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllWins', () => {
  it('gets all the wins in the database', async () => {
    const allWins = await db.getAllWins()
    expect(allWins).toHaveLength(2)
    expect(allWins[0].author).toBe('Anonymous MiddleName Aardvark')
  })
})

describe('addWins', () => {
  it('adds a win to the database', async () => {
    const currentWins = await db.getAllWins()
    await db.addWin({
      title: 'A Test Title',
      author: 'A Test Author',
    })
    const allWins = await db.getAllWins()
    expect(allWins).toHaveLength(currentWins.length + 1)
  })
})
