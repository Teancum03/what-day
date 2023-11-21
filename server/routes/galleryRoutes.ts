import express from 'express'
import { getImages } from '../apiCalls/pexelApiCalls'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const imagesList = await getImages()
    res.json(imagesList)
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    })
  }
})

export default router
