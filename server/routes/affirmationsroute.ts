import request from 'superagent'

import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await request.get('https://www.affirmations.dev/')
    res.json(response.body)
  } catch (error) {
    console.log(error)
  }
})

export default router
