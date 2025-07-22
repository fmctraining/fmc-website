import { requestInfo as r } from 'rwsdk/worker'

export function Breadcrumbs() {
  const pageData = r.ctx.pageContext?.pageData
  const crumbs = pageData?.crumbs
  return (
    <div className="px-1 xxs:px-2 md:px-[20px] max-w-[1250px] mx-auto">
      <div className="breadcrumbs w-fit py-2 px-6 rounded-full bg-primary border-4 border-white">
        <ul>
          <li key="0">
            <a href="/" className="decoration-2 underline-offset-8">
              Courses Home
            </a>
          </li>
          {crumbs?.map((crumb) => (
            <li key={crumb.path}>
              <a href={crumb.path} className="decoration-2 underline-offset-8">
                {crumb.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
