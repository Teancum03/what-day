import PageTitle from '@/components/PageTitle'
import { useUser } from '@/hooks/user'

function Wednesday() {
  const { user } = useUser()

  console.log(user?.name)

  return (
    <>
      <PageTitle descriptor="Weekly Win" day="Wednesday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        Content
      </div>
    </>
  )
}

export default Wednesday
