import { requestInfo as r } from 'rwsdk/worker'

export const Menu = () => {
  const pageData = r.ctx.pageContext?.pageData
  const crumbs = pageData?.crumbs
  const path = new URL(r.request.url).pathname
  const isHome = path === '/'
  return (
    <div className="p-1 xxs:p-2 md:p-4">
      <div className={'navbar min-h-auto pb-0 pr-0' + (isHome ? '' : ' items-baseline')}>
        <div className="navbar-start">
          <a href="/">
            <img
              src={isHome ? '/images/fmc_logo_05.png' : '/images/fmc_logo_top.png'}
              alt="FMC Logo"
              width="412"
              height={isHome ? '256' : '150'}
              className="w-[40px] -ml-1 xxs:ml-0 xs:w-[80px] sm:w-[120px] lg:w-[162px]"
            />
          </a>
        </div>
        <div className="navbar-end text-[12px] xs:text-[14px] sm:text-base md:text-xl font-semibold flex items-center uppercase ">
          <a
            href="https://futuremedia-concepts.com/"
            className="px-1 xs:px-2 sm:px-6 md:px-8 py-1 md:py-3 hidden lg:block  border-r border-gray-400 border-b-4 border-b-transparent hover:border-b-white"
          >
            Home
          </a>
          <a
            href="/"
            className="px-1 xs:px-2 sm:px-6 md:px-8 py-1 md:py-3 border-r border-gray-400 border-b-4 border-b-transparent hover:border-b-primary"
          >
            Courses
          </a>
          <a
            href="https://futuremedia-concepts.com/conferences/"
            className="px-1 xs:px-2 sm:px-6 md:px-8 py-1 md:py-3 border-r border-gray-400 border-b-4 border-b-transparent hover:border-b-secondary"
          >
            Conferences
          </a>
          <a
            href="https://futuremedia-concepts.com/certifications"
            className="pl-1 xs:px-2 sm:px-6 md:px-8 py-1 md:py-3 border-b-4 border-b-transparent hover:border-b-accent"
          >
            Certifications
          </a>
        </div>
      </div>
      {isHome ? (
        <div className="bg-primary text-white mt-2 sm:mt-4 md:mt-6 -mx-2 px-6 py-2 text-center clip-banner text-[14px] xs:text-[18px] md:text-[22px] font-semibold italic leading-[1.2] tracking-wider">
          Quality, consistent and accessible training for content creators and IT professionals
        </div>
      ) : (
        <div className="breadcrumbs w-fit mt-2 py-2 px-6 rounded-full bg-primary border-4 border-white">
          <ul>
            <li key="0">
              <a href="/" className="decoration-2 underline-offset-8">
                Courses Home
              </a>
            </li>
            {crumbs?.map((crumb, index) => (
              <li key={index}>
                <a href={crumb.path} className="decoration-2 underline-offset-8">
                  {crumb.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
