import { useQuery } from '@tanstack/react-query'
import { TeamTime } from '@models/teamTime'
import { getIdeas } from '@/apis/teamTimeApi'
import IdeaDialog from '@/components/TeamTime/IdeaDialog'

export function TeamTimeIdeas() {
  const {
    data: ideas,
    isLoading,
    error,
  } = useQuery<TeamTime[]>({
    queryKey: ['ideas'],
    queryFn: getIdeas,
  })

  if (error instanceof Error) {
    return <p>Error: unable to load ideas</p>
  }
  if (!ideas || isLoading) {
    return <p>Loading ideas...</p>
  }

  return (
    <div className=" flex  flex-wrap justify-center">
      {ideas.map((idea) => (
        <div className="m-5  w-auto p-10 " key={idea.id}>
          <IdeaDialog idea={idea.idea} description={idea.description} />
        </div>
      ))}
    </div>
  )
}
