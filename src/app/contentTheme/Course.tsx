import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { requestInfo as r } from 'rwsdk/worker'

export function Course() {
  const pageData = r.ctx.pageContext?.pageData
  const courseName = pageData?.attrs?.name || pageData?.attrs?.title
  return (
    <ContentLayout>
      <h1>{courseName}</h1>
      <ContentHtml />
    </ContentLayout>
  )
}
