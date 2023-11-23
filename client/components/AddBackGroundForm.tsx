import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import uploadBackgroundImg from '@/apis/uploadBackgroundImg'

const AddBackgroundForm = () => {
  const uploadImg = useMutation({
    mutationFn: uploadBackgroundImg,
    onSuccess: () => {
      console.log('Image uploaded')
    },
  })
  const [image, setImage] = useState<File | null>(null)
  const [imgName, setImgName] = useState<string>('')

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setImage(file)
    }
  }

  const handleImgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    setImgName(name)
  }

  const handleAddClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (image) uploadImg.mutate({ image, name: imgName })

    setImage(null)
    setImgName('')
  }

  const handleClearClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setImage(null)
    setImgName('')
  }

  return (
    <div>
      <h2>Add A Background</h2>
      <form className="AddBackgroundForm">
        <label className="Label" htmlFor="imgName">
          Name
        </label>
        <input
          className="Input"
          type="text"
          name="imgName"
          id="imgName"
          value={imgName}
          onChange={handleImgNameChange}
        />
        <div>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          )}

          {image === null && (
            <>
              <label htmlFor="uploadedImg">Choose Image</label>
              <input
                type="file"
                name="uploadedImg"
                id="uploadedImg"
                onChange={handleImageChange}
              />
            </>
          )}
        </div>

        <div>
          <button className="Button" onClick={handleAddClick}>
            Add
          </button>
          <button className="Button" onClick={handleClearClick}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBackgroundForm
