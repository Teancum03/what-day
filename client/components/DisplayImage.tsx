import { PexelsPhoto } from '../../models/gallery'

type Props = {
  image: PexelsPhoto
}

const DisplayImage = ({ image }: Props) => {
  const { src, photographer } = image

  return (
    <div>
      <img src={src.medium} alt={photographer || 'Unknown Photographer'} />
    </div>
  )
}

export default DisplayImage
