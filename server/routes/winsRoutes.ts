import express from 'express'

import { addWin, getAllWins } from '../db/functions/winsDB'
import { Win } from '@models/wins'

const router = express.Router()

// GET /api/v1/wins
router.get('/', async (req, res) => {
  try {
    const wins: Win[] = await getAllWins()

    res.json({ wins })
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong getting wins from the database: ${error}`,
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newWin = req.body as Win

    if (!newWin) {
      res.sendStatus(400)
      return
    }
    const win = await addWin(newWin)
    res.json({ win })
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong adding your win: ${error}`,
    })
  }
})

export default router
