import { requestInfo as r } from 'rwsdk/worker'

export function Breadcrumbs() {
  const pageData = r.ctx.pageContext?.pageData
  const crumbs = pageData?.crumbs
  return (
    <ul className="px-1 xxs:px-2 md:px-[20px] max-w-[1250px] mx-auto flex flex-wrap justify-center sm:justify-start gap-2">
      <li key="0" className="">
        <a
          href="/"
          className="inline-block decoration-2 hover:underline underline-offset-8 py-2 px-6 rounded-full bg-primary border-4 border-white"
        >
          Courses Home
        </a>
      </li>
      {crumbs?.map((crumb) => (
        <li key={crumb.path} className="">
          <a
            href={crumb.path}
            className="inline-block decoration-2 hover:underline underline-offset-8 py-2 px-6 rounded-full bg-primary border-4 border-white"
          >
            {crumb.name}
          </a>
        </li>
      ))}
    </ul>
  )
}
