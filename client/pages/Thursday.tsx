import PageTitle from '@/components/PageTitle'
import { TeamTimeIdeas } from '@/components/TeamTime/TeamTimeIdeas'
import { useUser } from '@/hooks/user'

function Thursday() {
  const { user } = useUser()
  return (
    <>
      <PageTitle descriptor="Team Time" day="Thursday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        {user && <TeamTimeIdeas user={user} />}
      </div>
    </>
  )
}

export default Thursday
