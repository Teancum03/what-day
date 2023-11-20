import express from 'express'
import { createClient } from 'pexels'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const pixels = createClient(process.env.PEXELS_API_KEY || '')

const getImages = async () => {
  const query = 'Nature'
  const images = await pixels.photos.search({ query, per_page: 1 })
  return images
}

router.get('/', async (req, res) => {
  try {
    const imagesList = await getImages()
    res.json(imagesList)
  } catch (error) {
    res.status(500).json({
      error: `Something went wrong getting images from Pexels: ${error}`,
    })
  }
})

export default router
