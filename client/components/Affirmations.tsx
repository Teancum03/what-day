import { getAffirmation } from '../apis/apiclient'
import { useQuery } from '@tanstack/react-query'

export default function Affirmation() {
  const {
    data: affirmation,
    isLoading,
    error,
    refetch: refetchAffirmation,
  } = useQuery({ queryKey: ['affirmation'], queryFn: getAffirmation })

  const handleGetNewAffirmation = async () => {
    await refetchAffirmation()
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  if (!affirmation || isLoading) {
    return <p>Loading affirmations...</p>
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold"> {affirmation.affirmation}</h1>
      <button
        onClick={handleGetNewAffirmation}
        className="rounded bg-gray-400 px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-300"
        type="button"
      >
        Get New Affirmation
      </button>
    </div>
  )
}
