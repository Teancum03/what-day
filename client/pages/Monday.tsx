// import { useEffect } from 'react'

import PageTitle from '@/components/PageTitle'
// import { affirmation } from '@/apis/langchain/affirmationInsight'

function Monday() {
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   console.log('Affirmation:', 'The quick brown fox jumps over the lazy dog.')
  //   console.log('Sending affirmation...')
  //   affirmation()
  // }, [])

  return (
    <>
      <PageTitle descriptor="Mindful Moments" day="Monday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        Content
      </div>
    </>
  )
}

export default Monday
