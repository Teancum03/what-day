import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadBackgroundImg } from '@/apis/uploadBackgroundImg'

const AddBackgroundForm = () => {
  const queryClient = useQueryClient()
  const uploadImg = useMutation({
    mutationFn: uploadBackgroundImg,
    onSuccess: () => {
      console.log('Image uploaded')
      queryClient.invalidateQueries({ queryKey: ['userBackgrounds'] })
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
    if (image) {
      uploadImg.mutate({ image, imgName, userName: 'testUserName' })
    }

    setImage(null)
    setImgName('')
  }

  const handleClearClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setImage(null)
    setImgName('')
  }

  return (
    <div className="backgroundFormComponent">
      <h2 className="mt-2 text-center font-header xl:text-4xl">
        Add A Background
      </h2>
      <form className="AddBackgroundForm">
        <label className="formLabel" htmlFor="imgName">
          Name
        </label>
        <input
          className="formInput"
          type="text"
          name="imgName"
          id="imgName"
          value={imgName}
          onChange={handleImgNameChange}
        />

        {image === null ? (
          <input
            type="file"
            className="customFileUpload"
            name="uploadedImg"
            id="uploadedImg"
            onChange={handleImageChange}
          />
        ) : (
          <>
            <h3 className="formLabel">Image</h3>
            <img
              className="previewImage"
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </>
        )}

        <div className="buttonsDiv">
          <button className="Button green" onClick={handleAddClick}>
            Add
          </button>
          <button className="Button green" onClick={handleClearClick}>
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBackgroundForm
