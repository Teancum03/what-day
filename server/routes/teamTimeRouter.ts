import express from 'express'

import * as db from '../db/functions/teamTimeDB'
import { TeamTime } from '@models/teamTime'

const router = express.Router()

// GET /api/v1/team-time
router.get('/', async (req, res) => {
  try {
    const idea: TeamTime[] = await db.getAllIdeas()
    res.json({ idea })
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in the TeamTime route: ${error}`,
    })
  }
})

//POST / api / v1 / team - time
router.post('/', async (req, res) => {
  try {
    const newIdea = req.body.idea as TeamTime

    if (!newIdea) {
      res.sendStatus(400)
      return
    }
    const idea = await db.addProjectIdea(newIdea)

    res.json({ idea })
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in the TeamTime route: ${error}`,
    })
  }
})

export default router
