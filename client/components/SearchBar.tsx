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
      <label htmlFor="searchbar">Search</label>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search"
        name="searchbar"
        id="searchbar"
      />
      <button onClick={handleNavigate}>Find</button>
    </div>
  )
}

export default SearchBar
