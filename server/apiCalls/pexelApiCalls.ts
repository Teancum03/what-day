import { createClient } from 'pexels'
import dotenv from 'dotenv'

import { ImageSearch } from '@models/gallery'

dotenv.config()

const getImages = async (userSearch: ImageSearch) => {
  const { search } = userSearch
  const pexels = createClient(process.env.PEXELS_API_KEY || '')
  const images = await pexels.photos.search({
    query: search,
    per_page: 8,
  })
  return images
}

export { getImages }
