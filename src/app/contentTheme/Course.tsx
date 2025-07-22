import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { requestInfo as r } from 'rwsdk/worker'

export function Course() {
  const pageData = r.ctx.pageContext?.pageData
  const courseName = pageData?.attrs?.name || pageData?.attrs?.title || pageData?.path
  return (
    <ContentLayout>
      <h1 className="max-w-3xl m-auto text-4xl">{courseName}</h1>
      <ContentHtml />
    </ContentLayout>
  )
}
