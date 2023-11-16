import express from 'express'

import { getAllTips } from '../db/functions/testingTipsDB'
import { TestingTip } from '@models/testingTips'

const router = express.Router()

// GET /api/v1/testing-tips
router.get('/', async (req, res) => {
  try {
    const tips: TestingTip[] = await getAllTips()
    res.json({ tips })
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong getting tips from the database: ${error}`,
    })
  }
})

export default router
