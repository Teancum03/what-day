import * as db from '../winsDB'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from '../../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(() => {
  return connection.seed.run()
})

describe('getAllWins', () => {
  it('gets all the wins in the database', async () => {
    const allWins = await db.getAllWins()
    expect(allWins).toHaveLength(2)
    expect(allWins[0].author).toBe('Anonymous Aardvark')
  })
})
