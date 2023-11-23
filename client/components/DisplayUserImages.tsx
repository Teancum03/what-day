import { useQuery } from '@tanstack/react-query'
import { getAllBackgroundImages } from '@/apis/uploadBackgroundImg'
function DisplayUserImages() {
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
    <div className="backgroundImageGrid">
      {images &&
        images.map((image) => (
          <div className='userImageDisplayed' key={image.imageId}>
            <h4 className="userImgName">{image.imageName}</h4>
            <img className="userImg" alt={image.imageName} src={image.url} />
          </div>
        ))}
    </div>
  )
}

export default DisplayUserImages
