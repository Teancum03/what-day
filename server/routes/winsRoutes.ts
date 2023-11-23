import express from 'express'

import { getAllWins } from '../db/functions/winsDB'
import { Wins } from '@models/wins'

const router = express.Router()

// GET /api/v1/wins
router.get('/', async (req, res) => {
  try {
    const wins: Wins[] = await getAllWins()
    res.json({ wins })
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong getting wins from the database: ${error}`,
    })
  }
})

export default router
