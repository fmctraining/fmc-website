import { requestInfo as r } from 'rwsdk/worker'
// import { Search } from './Search'

export const Menu = () => {
  const path = new URL(r.request.url).pathname
  const isHome = path === '/'
  return (
    <div className="p-1 xxs:px-2 xxs:pt-2 md:px-[25px] md:pt-[25px] max-w-[1250px] mx-auto mb-2 md:mb-3">
      <div className={'navbar min-h-auto p-0 items-start'}>
        <div className="navbar-start">
          <a href="/">
            <img
              src={isHome ? '/images/fmc_logo_05.png' : '/images/fmc_logo_top.png'}
              alt="FMC Logo"
              width="412"
              height={isHome ? '256' : '150'}
              className="w-[40px] mt-[3px] xxs:mt-0 xxs:w-[56px] xs:w-[80px] sm:w-[122px] lg:w-[162px]"
            />
          </a>
        </div>
        <div className="navbar-end xs:pt-1 sm:pt-2 text-[12px] xs:text-[14px] sm:text-base md:text-xl font-semibold flex items-center uppercase ">
          <a
            href="https://futuremedia-concepts.com/"
            className="px-1 xs:px-2 sm:px-6 lg:px-8 py-1 md:py-3 hidden lg:block  border-r border-gray-400 border-b-4 border-b-transparent hover:border-b-white"
          >
            Home
          </a>
          <a
            href="/"
            className="px-1 xs:px-2 sm:px-6 lg:px-8 py-1 md:py-3 hidden xxs:block border-r border-gray-400 border-b-4 border-b-transparent hover:border-b-primary"
          >
            Courses
          </a>
          <a
            href="https://futuremedia-concepts.com/conferences/"
            className="px-1 xs:px-2 sm:px-6 lg:px-8 py-1 md:py-3 border-r border-gray-400 border-b-4 border-b-transparent hover:border-b-secondary"
          >
            Conferences
          </a>
          <a
            href="https://futuremedia-concepts.com/certifications"
            className="px-1 xs:px-2 sm:px-6 lg:px-8 py-1 md:py-3 border-b-4 border-b-transparent hover:border-b-accent border-r border-gray-400"
          >
            Certifications
          </a>
          {/* <Search /> */}
        </div>
      </div>
    </div>
  )
}
