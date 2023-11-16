import { Link } from 'react-router-dom'

import { getDayTomorrow } from '@/lib/utils'

function Footer() {
  return (
    // <!--Footer container-->
    <footer className="flex flex-col items-center bg-secondary text-center text-primary">
      <div className="container p-2">
        <div className="">
          <p className="flex items-center justify-center">
            <span className="mr-4 font-header">How about tomorrow?</span>
            <Link
              className="inline-block rounded bg-primary px-6 pb-1.5 pt-2 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-yellow hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mb-0 md:mr-2"
              data-te-ripple-init
              data-te-ripple-color="light"
              to={`/${getDayTomorrow()}`}
              role="button"
            >
              {`Let's go`}
            </Link>
          </p>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="w-full bg-secondary-foreground p-4 text-center">
        © 2023 Copyright:
        <a className="" href="/about">
          {' '}
          wdii
        </a>
      </div>
    </footer>
  )
}

export default Footer
