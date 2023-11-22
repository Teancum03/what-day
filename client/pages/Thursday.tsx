import PageTitle from '@/components/PageTitle'
import { useUser } from '@/hooks/user'
import { TeamTimeIdeas } from '@/components/TeamTime/TeamTimeIdeas'

function Thursday() {
  return (
    <>
      <PageTitle descriptor="Team Time" day="Thursday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        <TeamTimeIdeas />
      </div>
    </>
  )
}

export default Thursday
