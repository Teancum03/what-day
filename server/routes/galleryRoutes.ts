import express from 'express'
import { createClient } from 'pexels'

const router = express.Router()
const pixels = createClient(
  'u5m02W1DcYNxRW5GBU0RA320LnW2JhxD3UXRS0MqnuC36twM8Plwsdfp'
)

const getImages = async () => {
  const query = 'Nature'
  const images = await pixels.photos.search({ query, per_page: 6 })
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
