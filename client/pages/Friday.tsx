import PageTitle from '@/components/PageTitle'
import { useQuery } from '@tanstack/react-query'
import { getImages } from '@/apis/galleryApi'
import DisplayImage from '@/components/DisplayImage'
import AddBackgroundForm from '@/components/AddBackGroundForm'
import DisplayUserImages from '@/components/DisplayUserImages'
import SearchBar from '@/components/SearchBar'
import { useSearchParams } from 'react-router-dom'

function Friday() {
  const [searchParams] = useSearchParams()
  const myParam = searchParams.get('image')

  // generate new queryKey from route params-
  // build additional cache stores rather than replacing
  const {
    data: images,
    isPending,
    error,
  } = useQuery({
    queryKey: ['gallery', myParam],
    queryFn: () => getImages(myParam || 'default'),
  })

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error:</div>

  return (
    <>
      <PageTitle descriptor="Fun Frame" day="Friday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        <SearchBar />
        <h1>test</h1>
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
