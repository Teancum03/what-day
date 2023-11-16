import { Link } from 'react-router-dom'

import { getDay } from '@/lib/utils'
import PageTitle from '@/components/PageTitle'

function About() {
  return (
    <>
      <h2 className="mb-16 mt-2 text-center font-header text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
        About
      </h2>
      <p className=" mt-2 text-xl tracking-tight md:text-2xl xl:text-3xl">
        <span className="mr-2 font-title font-bold text-purple">
          What day is it?{' '}
        </span>{' '}
        functions as a handy reminder about the day for tired bootcamp students.
      </p>
      <p className="mb-16 mt-2 text-xl tracking-tight md:text-2xl xl:text-3xl">
        Join us for ideas, tips, tricks and fun things needed for the week!
      </p>
      <p className="mb-16 mt-2 text-center text-xl tracking-tight md:text-2xl xl:text-3xl">
        Just start with{' '}
        <Link
          className="inline-block rounded bg-primary px-12 pb-3.5 pt-4 align-bottom text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mb-0 md:mr-2"
          data-te-ripple-init
          data-te-ripple-color="light"
          to={`/${getDay()}`}
          role="button"
        >
          {`It's today`}
        </Link>
      </p>
      <div className="mb-16 text-center "></div>

      <PageTitle descriptor="Created by" day="Team DD" />
    </>
  )
}

export default About
