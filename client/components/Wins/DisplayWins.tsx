import { getWins } from '@/apis/winsApi'
import { useQuery } from '@tanstack/react-query'

export default function DisplayWins() {
  const {
    data: wins,
    isLoading,
    error,
  } = useQuery<Wins[]>({
    queryKey: ['wins'],
    queryFn: getWins,
  })

  if (error) {
    return <p>There was an error trying to load the wins!</p>
  }

  if (!wins || isLoading) {
    return <p>{`We're loading here...`}</p>
  }


  return (
    <>
    <section>
      <h2 id="win-title">Wins</h2>
      <ul>
        {wins.map((win) => (
          <li key={win.id}>
              {win.title} by {win.author}
          </li>
        ))}
      </ul>
    </section>
    </>
  )
}