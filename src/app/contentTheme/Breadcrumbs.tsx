import { requestInfo as r } from 'rwsdk/worker'
import { ButtonLink } from './ButtonLink'

export function Breadcrumbs() {
  const pageData = r.ctx.pageContext?.pageData
  const crumbs = pageData?.crumbs
  return (
    <ul className="px-1 xxs:px-2 md:px-[20px] mt-3 max-w-[1250px] mx-auto flex flex-wrap justify-center lg:justify-start gap-2">
      <li key="0" className="">
        <ButtonLink href="/" text="Courses Home" key="0" />
      </li>
      {crumbs?.map((crumb) => (
        <li key={crumb.path} className="">
          <ButtonLink href={crumb.path} text={crumb.name} key={crumb.path} />
        </li>
      ))}
    </ul>
  )
}
