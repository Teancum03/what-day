import express from 'express'

import { getAllIdeas } from '../db/functions/teamTimeDB'
import { TeamTime } from '@models/teamTime'

const router = express.Router()


// GET /api/v1/team-time
router.get("/", async (req, res)=> {
  try {
    const idea: TeamTime[] = await getAllIdeas()
    res.json({ idea })
  } catch (error) {
    res.status(500).json({
      error: `something went wrong in the TeamTime route: ${error}`
    })
  }
})

export default router