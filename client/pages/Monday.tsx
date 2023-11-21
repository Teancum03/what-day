import PageTitle from '@/components/PageTitle'
import AffirmationComponent from '../components/Affirmations'

function Monday() {
  return (
    <>
      <PageTitle descriptor="Mindful Moments" day="Monday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        <AffirmationComponent />
      </div>
    </>
  )
}

export default Monday
