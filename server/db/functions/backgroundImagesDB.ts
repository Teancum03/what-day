import connection from '../connection'

interface BackgroundImageData {
  imgName: string
  nameId: string
  userName: string
}

export async function addBackgroundImage({
  imgName,
  nameId,
  userName,
}: BackgroundImageData): Promise<void> {
  const db = connection
  const [uploadedImageId] = await db('background_images').insert({
    img_name: imgName,
    name_id: nameId,
    user_name: userName,
  })
  console.log('uploadedImageId', uploadedImageId)
  // return uploadedImage
}

export async function getAllBackgroundImages(): Promise<any> {
  const db = connection
  return await db('background_images').select('*')
  // return uploadedImage
}
