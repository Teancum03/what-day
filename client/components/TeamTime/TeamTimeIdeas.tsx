import { useQuery } from '@tanstack/react-query'
import { TeamTime } from '@models/teamTime'
import { getIdeas } from '@/apis/teamTimeApi'
import IdeaDialog from '@/components/TeamTime/IdeaDialog'
import AddProjectIdea from '@/components/TeamTime/AddProjectIdea'
import { User } from '@models/user'

export function TeamTimeIdeas({ user }: { user: User }) {
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
    <>
      <div className="flex flex-wrap">
        <div className=" m-auto flex flex-wrap justify-center">
          {ideas.map((idea) => (
            <div className="m-5 p-8 " key={idea.id}>
              <IdeaDialog
                idea={idea.idea}
                description={idea.description}
                author={idea.author}
              />
            </div>
          ))}
        </div>
        <div className="m-auto flex">
          <AddProjectIdea user={user} />
        </div>
      </div>
    </>
  )
}
