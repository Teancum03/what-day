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
    <div className='backgroundImageGrid'>
      {images.map((image) => (
        <img key={image.imageId} alt={image.imageName} src={image.url} />
      ))}
    </div>
  )
}

export default DisplayUserImages
