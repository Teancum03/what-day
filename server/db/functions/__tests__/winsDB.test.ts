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
    expect(allWins[0].author).toBe('Anonymous Aardvark')
  })
})
