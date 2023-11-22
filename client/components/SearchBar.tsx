import { useState } from 'react'
import { getImages } from '@/apis/galleryApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function SearchBar() {
  const [search, setSearch] = useState('test')
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: getImages,
    onSuccess: async (res) => {
      queryClient.setQueryData(['gallery'], res)
    },
  })

  return (
    <div className="friday-searchbar">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <button onClick={() => mutate(search)}>Find</button>
    </div>
  )
}

export default SearchBar
