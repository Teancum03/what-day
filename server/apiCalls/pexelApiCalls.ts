import { createClient } from 'pexels'
import dotenv from 'dotenv'
dotenv.config()

const getImages = async () => {
  const pexels = createClient(process.env.PEXELS_API_KEY || '')
  const query = 'Nature'
  const images = await pexels.photos.search({ query, per_page: 1 })
  return images
}

export { getImages }