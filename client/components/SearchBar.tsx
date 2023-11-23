import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [search, setSearch] = useState('default')
  const navigate = useNavigate()

  function handleNavigate() {
    navigate({ pathname: '/friday', search: `image=${search}` })
  }

  return (
    <div className="friday-searchbar">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <button onClick={handleNavigate}>Find</button>
    </div>
  )
}

export default SearchBar
