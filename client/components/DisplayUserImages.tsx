import { useQuery } from '@tanstack/react-query'
import { getAllBackgroundImages } from '@/apis/uploadBackgroundImg'
import { useState } from 'react'

interface selectedImg {
  imageSrc: string
  imageName?: string
}

function DisplayUserImages() {
  const [selectedImage, setSelectedImage] = useState<selectedImg | null>(null)

  const selectImg = (event: React.MouseEvent<HTMLDivElement>) => {
    const imageSrc = event.currentTarget
      .querySelector('img')
      ?.getAttribute('src')
    let imageName = event.currentTarget.querySelector('h4')?.textContent
    if (!imageSrc) return
    if (!imageName) imageName = 'No Name'
    setSelectedImage({ imageSrc, imageName })
    console.log('imageSrc', imageSrc)
  }

  const {
    data: images,
    isPending,
    error,
  } = useQuery({
    queryKey: ['userBackgrounds'],
    queryFn: getAllBackgroundImages,
  })

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error:</div>

  return (
    <div>
      {selectedImage && (
        <div className="userImageDisplayed">
          <h4 className="userImgName">{selectedImage.imageName}</h4>
          <img alt={selectedImage.imageName} src={selectedImage.imageSrc} />
        </div>
      )}
      <div className="backgroundImageGrid">
        {images &&
          images.map((image) => (
            <div
              className="userImageDisplayed"
              key={image.imageId}
              onClick={selectImg}
            >
              <h4 className="userImgName">{image.imageName}</h4>
              <img className="userImg" alt={image.imageName} src={image.url} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default DisplayUserImages
