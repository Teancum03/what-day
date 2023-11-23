import request from 'superagent'

interface ImageFormData {
  image: File
  name: string
}

const uploadBackgroundImg = async ({ image, name }: ImageFormData) => {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('name', name)

  const response = await request.post('/api/v1/userImgs').send(formData)

  return response
}

export default uploadBackgroundImg
