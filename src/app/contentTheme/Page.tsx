import { requestInfo as r } from 'rwsdk/worker'
import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { DirList } from './DirList'

export function Page() {
  const pageData = r.ctx.pageContext?.pageData
  const title = pageData?.attrs?.name || pageData?.attrs?.title || pageData?.path
  return (
    <ContentLayout>
      <h1 className="max-w-3xl m-auto text-3xl sm:text-4xl md:text-5xl">{title}</h1>
      <ContentHtml />
      <DirList />
    </ContentLayout>
  )
}
