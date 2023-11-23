import PageTitle from '@/components/PageTitle'
import { useQuery } from '@tanstack/react-query'
import { getImages } from '@/apis/galleryApi'
import DisplayImage from '@/components/DisplayImage'
import AddBackgroundForm from '@/components/AddBackGroundForm'
import DisplayUserImages from '@/components/DisplayUserImages'

function Friday() {
  const {
    data: images,
    isPending,
    error,
  } = useQuery({ queryKey: ['gallery'], queryFn: getImages })

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error:</div>

  return (
    <>
      <PageTitle descriptor="Fun Frame" day="Friday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        {images.photos.map((image) => (
          <DisplayImage key={image.id} image={image} />
        ))}
      </div>
      <div>
        <div className="userImagesDisplay">
          <DisplayUserImages />
          <AddBackgroundForm />
        </div>
      </div>
    </>
  )
}

export default Friday
