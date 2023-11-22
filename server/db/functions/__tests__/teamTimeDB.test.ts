import * as db from '../teamTimeDB'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from '../../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllIdeas', () => {
  it('gets the complete list of ideas', async () => {
    const allIdeas = await db.getAllIdeas()
    console.log(allIdeas)
    expect(allIdeas).toHaveLength(9)
    expect(allIdeas[0].id).toBe(1)
    expect(allIdeas[0].idea).toBe('Duck vs Bear')

    expect(allIdeas[0].description).toBe(
      'An app that gets users to choose between to scary options at a time and shows a list of the most scary!'
    )
  })

  afterAll(() => {
    connection.destroy()
  })
})
