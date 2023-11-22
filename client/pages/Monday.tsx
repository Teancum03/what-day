import PageTitle from '@/components/PageTitle'
import Affirmation from '../components/Affirmations'
import AffirmationComponent from '@/apis/langchain/affirmationInsight'

function Monday() {
  return (
    <>
      <PageTitle descriptor="Mindful Moments" day="Monday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        <Affirmation />
        <AffirmationComponent />
      </div>
    </>
  )
}

export default Monday
