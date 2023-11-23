import request from 'superagent'

interface ImageFormData {
  image: File
  imgName: string
  userName: string
}

interface UserImage {
  imageName: string
  imageId: string
  userName: string
  url: string
}

const uploadBackgroundImg = async ({
  image,
  imgName,
  userName,
}: ImageFormData) => {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('imgName', imgName)
  formData.append('userName', userName)

  const response = await request.post('/api/v1/userImgs').send(formData)

  return response
}

const getAllBackgroundImages = async (): Promise<UserImage[]> => {
  const response = await request.get('/api/v1/userImgs')
  const images = response.body
  return images
}

export { uploadBackgroundImg, getAllBackgroundImages }
