import { ContentLayout } from './ContentLayout'
import { ContentHtml } from './ContentHtml'
import { requestInfo as r } from 'rwsdk/worker'
import { DirList } from './DirList'

export function CourseGroup() {
  const pageData = r.ctx.pageContext?.pageData
  return (
    <ContentLayout>
      <h1>{pageData?.attrs?.name} Courses</h1>
      <ContentHtml />
      <DirList />
    </ContentLayout>
  )
}
