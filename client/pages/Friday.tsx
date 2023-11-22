import PageTitle from '@/components/PageTitle'
import { useQuery } from '@tanstack/react-query'
import { getImages } from '@/apis/galleryApi'
import DisplayImage from '@/components/DisplayImage'
import SearchBar from '@/components/SearchBar'

function Friday() {
  const {
    data: images,
    isPending,
    error,
  } = useQuery({ 
    queryKey: ['gallery'], 
    queryFn: () => getImages('default') 
  })

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error:</div>

  return (
    <>
      <PageTitle descriptor="Fun Frame" day="Friday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        <SearchBar />
        {images.photos.map((image) => (
          <DisplayImage key={image.id} image={image} />
        ))}
      </div>
    </>
  )
}

export default Friday
