import PageTitle from '@/components/PageTitle'
import { AdditionalTips } from '@/components/TestingTips/AdditionalTips'
import { TestingTipsTabs } from '@/components/TestingTips/TestingTipsTabs'

function Tuesday() {
  return (
    <>
      <PageTitle descriptor="Testing Tips" day="Tuesday" />
      <div className="text-xl tracking-tight md:text-2xl xl:text-3xl">
        <TestingTipsTabs />
        <AdditionalTips />
      </div>
    </>
  )
}

export default Tuesday
