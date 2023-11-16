import { Link } from 'react-router-dom'

import { getDay } from '@/lib/utils'

function Home() {
  return (
    <div className="px-6 pb-12 text-center md:px-12 md:pt-12 lg:text-left">
      <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <div className="mt-12 lg:mt-0">
            <h1 className="mb-16 mt-2 font-header text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
              Welcome Bootcampers! <br />
              <span className="font-title text-purple">What day is it?</span>
            </h1>
            <Link
              className="mb-2 inline-block rounded bg-primary px-12 pb-3.5 pt-4 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mb-0 md:mr-2"
              data-te-ripple-init
              data-te-ripple-color="light"
              to={`/${getDay()}`}
              role="button"
            >
              {`It's today`}
            </Link>
            <Link
              className="hover:text-primary-600 focus:text-primary-600 active:text-primary-700 inline-block rounded px-12 pb-3.5 pt-4 text-sm font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 dark:hover:bg-neutral-800 dark:hover:bg-opacity-60"
              data-te-ripple-init
              data-te-ripple-color="light"
              to="/about"
              role="button"
            >
              Learn more
            </Link>
          </div>
          <div className="mb-12 lg:mb-0">
            <img
              src={'/images/splash.png'}
              className="w-full rounded-lg shadow-lg dark:shadow-black/20"
              alt="Pooh and Christopher discussing the day"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
