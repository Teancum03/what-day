import PageTitle from '@/components/PageTitle'
import { useUser } from '@/hooks/user'

import DisplayWins from '@/components/Wins/DisplayWins'

function Wednesday() {
  const { user } = useUser()

  const styles = {
    marginTop: '-48px',
  }

  return (
    <>
      <PageTitle descriptor="Weekly Win" day="Wednesday" />
      <div
        className="text-xl tracking-tight md:text-2xl xl:text-3xl"
        style={styles}
      >
        {user && <DisplayWins name={user?.longName} />}
      </div>
    </>
  )
}

export default Wednesday
