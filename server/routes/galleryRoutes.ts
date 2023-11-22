import express from 'express'
import { getImages } from '../apiCalls/pexelApiCalls'
import { ImageSearch } from '@models/gallery'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const search = req.query as ImageSearch
    const imagesList = await getImages(search)
    res.json(imagesList)
  } catch (error) {
    res.status(500).json({
      error: `${error}`,
    })
  }
})

export default router
